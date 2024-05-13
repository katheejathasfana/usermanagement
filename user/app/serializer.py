from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone_No', 'profile_pic'] 

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = User
        fields = ['username', 'email', 'password','profile']

    def custom_validate(self,validated_data):
        existing_user = User.objects.filter(username=validated_data.get('username')).exists()
        if existing_user:
            raise serializers.ValidationError("This username is already registered.")
        
        existing_email = User.objects.filter(email=validated_data.get('email')).exists()
        if existing_email:
            raise serializers.ValidationError("This email is already registered.")
        
    def create(self, validated_data):
        phone_no = validated_data.pop('phone_no', None)
        profile_img = validated_data.pop('profile_img', None)

        # Create the user
        user = User.objects.create_user(**validated_data)
        user.set_password('password')

        # Set phone number if provided
        if phone_no is not None:
            Profile.objects.create(user=user, phone_No=phone_no)

        # Set profile picture if provided
        if profile_img is not None:
            user.profile.profile_pic= profile_img
            user.profile.save()

        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = ['username', 'password']
        
    username=serializers.CharField()
    password=serializers.CharField()

