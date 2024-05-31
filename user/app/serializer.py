from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    phone_No = serializers.IntegerField(required=False)
    profile_pic = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = ['phone_No', 'profile_pic']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        existing_user = User.objects.filter(username=data.get('username')).exists()
        if existing_user:
            raise serializers.ValidationError("This username is already registered.")
        
        existing_email = User.objects.filter(email=data.get('email')).exists()
        if existing_email:
            raise serializers.ValidationError("This email is already registered.")

        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = ['username', 'password']
        
   

