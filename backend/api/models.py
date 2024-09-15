from django.db import models
from django.contrib.auth.hashers import make_password, check_password as django_check_password


class User(models.Model):
    name = models.CharField(max_length=255,null=False)
    email = models.EmailField(unique=True,null=False)
    password = models.CharField(max_length=255)
    phone=models.IntegerField(unique=True,null=True)
    birthdate=models.DateField(null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.name +" : "+self.email
    
    def save(self, *args, **kwargs):
        if self.pk is None:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
        
    def check_password(self, raw_password):
        return django_check_password(raw_password, self.password)