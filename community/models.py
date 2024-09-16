from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Community(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='community/images', null= True, blank=True)
    socials = models.JSONField(models.URLField(), blank=True,null=True, default=list)
    members = models.ManyToManyField(User,related_name='communityMembers', default=[])
    def __str__(self):
        return self.name

class Message(models.Model):
    sender = models.ForeignKey(User,on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete= models.CASCADE)
    title = models.CharField(max_length= 200)
    message = models.TextField()
    time = models.DateTimeField(auto_now_add=True)