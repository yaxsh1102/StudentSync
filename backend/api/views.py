from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.permissions import AllowAny  
from rest_framework import generics, status, permissions
from django.http import JsonResponse
from .serializers import *
import requests
from .models import *
from .sendmail import sendMail
import random
from django.utils import timezone  
from datetime import timedelta ,date
import jwt  
from django.conf import settings 
from django.core.files.storage import default_storage
import json
from rest_framework.parsers import MultiPartParser, FormParser
import os
from django.core.files.uploadedfile import InMemoryUploadedFile

def create_jwt(email):
    payload = {
        'email': email,
        'exp': timezone.now() + timedelta(hours=1),
        'iat': timezone.now()
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

class GoogleAuthView(APIView):
    def post(self, request):
        print("REached google auth")
        try:
            token = request.data.get('token')
            if not token:
                return JsonResponse({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Verify the token with Google's API
            response = requests.get(f'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}')
            user_info = response.json()
            
            if response.status_code != 200:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Extract user info
            email = user_info.get('email')
            name = user_info.get('name')
            
            if not email:
                return Response({'error': 'Email is missing from token'}, status=status.HTTP_400_BAD_REQUEST)
            
            jwt_token=create_jwt(email)
            user, created = User.objects.get_or_create(email=email, defaults={'name': name})
            user.save()

            return Response({
                    'status':200,
                    'jwt':jwt_token,
                    'name': user.name,
                    'email': user.email
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetOtpView(APIView):
    permission_classes=[AllowAny]
    otp=0
    def post(self,request):
        email = request.data.get('email')
        code=random.randint(1000, 9999)
        GetOtpView.otp=code
        try:
            sendMail(email=email,code=code)
            SignupView.otp=code
            return Response({
                'status':200,
                'message':'Otp sent Successfully to '+email
            }, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status':400,
                'message':'Some Error Occured While Sending OTP'
            }, status=status.HTTP_400_BAD_REQUEST)

class SignupView(APIView):
    permission_classes = [AllowAny]
    # otp=int(GetOtpView.otp)
    def post(self, request):
        otp=request.data.get('otp')
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.create(
                    name=serializer.validated_data['name'],
                    email=serializer.validated_data['email'],
                    phone=serializer.validated_data['phone'],
                    password=serializer.validated_data['password'],
                )
                user.save()
                jwt_token = create_jwt(serializer.validated_data['email'])
                
                return Response({
                    'status': 200,
                    'jwt': jwt_token,
                    'message': 'Account created successfully!'
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                return Response({
                    'status': 500,
                    'message': 'Some error occurred while creating the account',
                    'error': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            errors = serializer.errors
            errMsg = next(iter(errors.values()), 'Unknown')

            return Response({
                'status': 400,
                'message':errMsg[0]
            }, status=status.HTTP_400_BAD_REQUEST)
         
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        cred=request.data.get('cred')
        email,phone='',''
        if '@' in cred :
            email=cred
        else:
            phone=cred
            
        serializer = UserLoginSerializer(data={'email':email,'phone':phone,'password':request.data.get('password')})

        if serializer.is_valid():
            try:
                if email:    
                    user=User.objects.filter(email=serializer.validated_data['email']).first()
                else:
                    user=User.objects.filter(phone=serializer.validated_data['phone']).first()

                if user:
                    if not user.check_password(serializer.validated_data.get('password')):
                        return Response({
                            'status': 401,
                            'message': 'Invalid password'
                        },status=status.HTTP_406_NOT_ACCEPTABLE)
                    else:
                        jwt=create_jwt(email=email)
                        return Response({
                            'status': 200,
                            'jwt':jwt,
                            'message': 'Login Successfull',
                            'user':{
                                'email':user.email,
                                'name':user.name
                            }
                        },status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({
                            'status': 401,
                            'message': 'Invalid Email or phone number'
                        },status=status.HTTP_406_NOT_ACCEPTABLE)
            except Exception as e :
                print(e)
                return Response({
                            'status': 500,
                            'message': 'Error occured while fetching user'
                        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            errors = serializer.errors
            errMsg = next(iter(errors.values()), 'Unknown')

            return Response({
                'status': 400,
                'message':errMsg[0]
            }, status=status.HTTP_400_BAD_REQUEST)
            
class GetUserDataView(APIView):
    permission_classes =[AllowAny]
    
    def post(self,request):
        try:
            user = User.objects.get(email=request.data.get('email'))
            ser = ProfileSerializer(user)
            # print(ser.data)
            
            return Response({
                'status':200,
                'user':ser.data
            },status=status.HTTP_200_OK)
        except:
            return Response({
                'status':404,
            },status=status.HTTP_404_NOT_FOUND)
            
class EventView(APIView):
    
    def post(self,request):
        email = request.data.get('email')
        events = Event.objects.all()
        today = date.today()
        userEvents,upcoming,live,past=[],[],[],[]
        
        try:
            user=User.objects.get(email=email)
            allUserEvents=Event.objects.filter(event_handler=user)
            
            for i in allUserEvents:
                eventSer = EventSerializer(i)
                userEvents+=eventSer.data,

            for i in events :
                eventSer = EventSerializer(i)
                
                if i.date > today:
                    upcoming+=eventSer.data,
                elif i.date < today:
                    past+=eventSer.data,
                else:
                    live+=eventSer.data,
            
            return Response({
                'status':200,
                'userEvents':userEvents,
                'upcoming':upcoming,
                'live':live,
                'past':past
            },status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })
    
class CreateEventView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        print(request.data)

        # Extract email and image from the request
        email = request.data.get('email')

        try:
            user = User.objects.get(email=email)
            
            ser = EventSerializer(data=request.data)
            
            if ser.is_valid():
                ser.save(event_handler=user)
                return Response({
                    'status': 200,
                    'message': "Event Created Successfully"
                }, status=status.HTTP_201_CREATED)
            else:
                err = ser.errors  
                print(err)
                return Response({
                    'status': 400,
                    'message': err
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })

class GetEventDetail(APIView):
    permission_classes=[AllowAny]
    
    def post(self,request):
        id = request.data.get('id')
        try:
            event = Event.objects.get(id=id)
            eventSer = EventSerializer(event)
            return Response({
                'status':200,
                'event':eventSer.data
            },status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })
    
class CreateRoomView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        print(request.data)

        email = request.data.get('email')

        try:
            user =User.objects.get(email=email)
            
            if len(Room.objects.filter(room_creator=user)) > 0:
                return Response({
                        'status': 400,
                        'message': "User Have already created 1 room"
                    }, status=status.HTTP_403_FORBIDDEN)
            
            ser = RoomSerializer(data=request.data)
            if ser.is_valid():
                ser.save(room_creator=user)
                
                return Response({
                        'status': 200,
                        'message': "Room Created Successfully"
                    }, status=status.HTTP_201_CREATED)
            else:
                err = ser.errors  
                print(err)
                return Response({
                    'status': 400,
                    'message': err
                }, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({
                'status': 404,
                'message': 'No user found'
            }, status=status.HTTP_404_NOT_FOUND)

class RoomView(APIView):
    def post(self,request):
        email = request.data.get('email')
        rooms = Room.objects.all()
        userRoom,availableRooms=[],[]
        
        try:
        
            user=User.objects.get(email=email)
            userRoom_query=Room.objects.filter(room_creator=user)
            
            if len(userRoom_query)>0:
                userRoom=RoomSerializer(userRoom_query[0])
            
            for i in rooms :
                eventSer = RoomSerializer(i)
                if not userRoom or eventSer.data !=userRoom.data:
                    availableRooms+=eventSer.data,
                
            
            return Response({
                'status':200,
                'userRoom':userRoom.data if userRoom else None,
                'availableRooms':availableRooms,
            },status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })
    
class DeleteRoomView(APIView):
    def post(self,request):
        email = request.data.get('email')
        try:
            user=User.objects.get(email=email)
            userRoom=Room.objects.filter(room_creator=user)[0]
            userRoom.delete()
            return Response({
                        'status': 200,
                        'message': "Room deleted successfully"
                    }, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })
            
class GetRoomDetail(APIView):
    def post(self,request):
        id = request.data.get('id')
        
        try:
            room = Room.objects.get(id=id)
            roomSer = RoomSerializer(room)
            print(roomSer.data)
            user=UserSerializer(room.room_creator)
            
            return Response({
                'status':200,
                'event':roomSer.data,
                'owner':user.data,
            },status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })

class UpdateProfileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self,request):
        data=request.data
        try:
            user=User.objects.get(email=request.data.get('email'))
            print(data)
            user.name = data['name']
            
            if len(User.objects.filter(phone=data['phone'])) == 0 :
                user.phone = data['phone']
            else:
                return Response({
                'status':400,
                'message': "Entered Phone Number Already Exists"
            },status=status.HTTP_200_OK)
            user.birthdate = data['birthdate']
            user.gender = data['gender']
            user.area = data['area']
            user.city = data['city']
            user.state = data['state']
            image = data.get('image', None)
            if image and isinstance(image, InMemoryUploadedFile):
                user.image = image
            user.save()
                
            return Response({
                'status':200,
                'message':"Profile Updated successfully"
            })
        except Exception as e:
            print(e)
            return Response({
                'status':400,
                'message':e
            },status=status.HTTP_400_BAD_REQUEST)
            
class ProfileView(APIView):
    
    def  post(self,request):
        id=request.data.get('id')
        try:
            user = User.objects.get(id=id)
            ser = ProfileSerializer(user)
            # print(ser.data)
            return Response({
                'status':200,
                'profile':ser.data
            },status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status':400,
                'messages':"User Not found"
            },status=status.HTTP_400_BAD_REQUEST)
            
class DormitoryView(APIView):
    
    def post(self,request):
        email = request.data.get('email')
        userDormitories,otherDormitories=[],[]
        userDormId=[]
        try:
            user = User.objects.get(email=email)
            allUserDormitories= Dormitory.objects.filter(dorm_creator=user)
            
            for i in allUserDormitories:
                ser = DormitorySerializer(i)
                userDormitories+=ser.data, 
                userDormId+=ser.data,
                
            allOtherDormitories= Dormitory.objects.all()

            for i in allOtherDormitories:
                ser = DormitorySerializer(i)
                
                if ser.data not in userDormId:
                    otherDormitories+=ser.data,
                    
            return Response({
                'status':200,
                'userDormitories':userDormitories,
                'otherDormitories':otherDormitories,
            })
                    
        except Exception as e:
            print(e)
            return Response({
                'status':400,
                'messages':"Some Error Occured in server while fetching dorms"
            })

class CreateDormitoryView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self,request):
        email = request.data.get('email')

        try:
            user=User.objects.get(email=email)
            
            ser = DormitorySerializer(data=request.data)
            
            if ser.is_valid():
                ser.save(dorm_creator=user)
                print("DORM CREATED")
                return Response({
                'status':200,
                'message':"Dorm Added"
            })
            else:
                err = ser.errors  
                print(err)
                return Response({
                    'status': 400,
                    'message': err
                })
        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })
            
class DeleteDormitoryView(APIView):
    def post(self, request):
        id = request.data.get('id')
            
        try:
            dorm = Dormitory.objects.get(id=id)
            dorm.delete()
            
            return Response({
                'status':200,
                'message':"Dorm Deleted"
            })
            
        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })
            
class GetDormitoryDetailsView(APIView):
    
    def post(self,request):
        id = request.data.get('id')
        
        try:
            dorm = Dormitory.objects.get(id=id)
            dormitory = DormitorySerializer(dorm)
            owner = UserSerializer(dorm.dorm_creator)
            
            return Response({
                'status':200,
                'dormitory':dormitory.data,
                'owner':owner.data,
            })
            
        except Exception as e:
            print(e)
            return Response({
                'status': 404,
                'message': 'Some Error Occured'
            })
            
            
            
            
            
            
            
            
            
            