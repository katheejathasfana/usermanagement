from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_No=models.IntegerField(null=True, blank=True)
    profile_pic=models.ImageField(upload_to='profile_pic', blank=True)