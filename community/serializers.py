from rest_framework.serializers import ModelSerializer
from .models import Community, Message

class CommunitySerializer(ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'