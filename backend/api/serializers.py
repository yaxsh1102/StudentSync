from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    otp = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['name','email','phone', 'password','birthdate','otp']
        extra_kwargs = {
            'password': {'write_only': True},
        }
        
    def validate(self,data):
        from .views import GetOtpView
        
        if not data['name'] or not data['email'] or not data['password'] :
            raise serializers.ValidationError("Fields marked with * must not be empty")
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError( "Email is already in use.")
        if data['phone']:
            if User.objects.filter(phone=data['phone']).exists():
                raise serializers.ValidationError("Contact Number is already in use.")
            if  not len(str(data['phone']))==10:
                raise serializers.ValidationError("Contact number must be 10 of digits")
        if not 8<=len(data['password'])<=20:
            raise serializers.ValidationError("Password must be between 8 and 20 characters long.")
        if int(data['otp']) != GetOtpView.otp:
            raise serializers.ValidationError("Invalid OTP")
        return data
        
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)   
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['email','phone','password']
        
    def validate(self,data):
        if ( not data['email'] and not data['phone']) or not data['password'] :
            raise serializers.ValidationError("Please fill both fields")
        if data['phone']:
            if not len(str(data['phone']))==10:
                raise serializers.ValidationError('Invalid Email or phone number')
        return data
    
class EventSerializer(serializers.ModelSerializer):
    # user=UserSerializer()
    class Meta:
        model = Event
        fields = ['id','title','image','type','date','time','venue','description','organizer','capacity','deadline','prizes','sponsors']