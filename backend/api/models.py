from django.db import models
from django.contrib.auth.hashers import make_password, check_password as django_check_password


class User(models.Model):
    name = models.CharField(max_length=255,null=False)
    email = models.EmailField(unique=True,null=False)
    password = models.CharField(max_length=255)
    phone=models.IntegerField(unique=True,null=True)
    birthdate=models.DateField(null=True)
    gender = models.CharField(max_length=100,null=True)
    area = models.CharField(max_length=300,null=True)
    city = models.CharField(max_length=100,null=True)
    state = models.CharField(max_length=100,null=True)
    image = models.ImageField(upload_to='users/',null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name +" : "+self.email
    
    def save(self, *args, **kwargs):
        if self.pk is None:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
        
    def check_password(self, raw_password):
        return django_check_password(raw_password, self.password)
    
    
class Event(models.Model):
    event_handler = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=255,null=False)
    image = models.ImageField(upload_to='events/')
    type = models.CharField(max_length=100)
    date = models.DateField(null=False)
    time = models.TimeField(null=False)
    venue = models.CharField(max_length=300)
    description = models.TextField(null=True)
    organizer = models.CharField(max_length=300)
    capacity = models.CharField(max_length=100)
    deadline = models.DateField()
    prizes = models.CharField(max_length=500)
    sponsors = models.CharField(max_length=700)
    
    def __str__(self):
        return self.title + " : " + self.event_handler.name
    
    class Meta:
        ordering = ['-date']
        
class Room(models.Model):
    room_creator = models.ForeignKey(User,on_delete=models.CASCADE)
    building_name = models.CharField(max_length=300)
    persons_required = models.CharField(max_length=200)
    details = models.CharField(max_length=1000)
    address = models.CharField(max_length=400)
    image = models.ImageField(upload_to='rooms/')
    
    def __str__(self):
        return self.building_name + " : " + self.room_creator.name
    
    
class Dormitory(models.Model):
    dorm_creator = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=500)
    capacity = models.CharField(max_length=100)
    description = models.TextField()
    image=models.ImageField(upload_to='dorms/')
    
    
    def __str__(self):
        return self.name