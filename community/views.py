from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import CommunitySerializer
from .models import Community

# Create your views here.
@api_view(['GET'])
def getAll(request):
    communities = Community.objects.all()
    print(len(communities))
    serializedCommunities = CommunitySerializer(communities,many = True)
    return Response(serializedCommunities.data, status= status.HTTP_200_OK)

@api_view(['GET'])
def getById(request, id):
    try: 
        communities = Community.objects.get(pk = id)
        serializedCommunities = CommunitySerializer(communities)
        return Response(serializedCommunities.data, status=status.HTTP_200_OK)

    except Community.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create(request):
    print(request.data["name"])
    newCommunity = Community()
    newCommunity.name = request.data["name"]
    # newCommunity.image = request.POST['image']
    newCommunity.description = request.data['description']
    newCommunity.save()
    serializedNewCommunity = CommunitySerializer(newCommunity)
    return Response(serializedNewCommunity.data, status=status.HTTP_200_OK)
# {"name": "Django Course", "description": "hudsh dhfhjh jffdshj bsfidn"}


@api_view(['GET','POST'])
def update(request, id):
    if request.method == 'GET':
        try: 
            communities = Community.objects.get(pk = id)
            serializedCommunities = CommunitySerializer(communities)
            return Response(serializedCommunities.data, status=status.HTTP_200_OK)

        except Community.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        try: 
            communities = get_object_or_404(Community,pk = id)
            requestData = request.data
            for key in requestData:
                communities.__setattr__(key,requestData[key])
            communities.save()
            serializedCommunities = CommunitySerializer(communities)
            return Response(serializedCommunities.data, status=status.HTTP_200_OK)

        except Community.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    

@api_view(['POST'])
def delete(request, id):
    pass