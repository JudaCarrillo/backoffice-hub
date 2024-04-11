from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.user_profile.models import UserProfile
from apps.user_profile.serializers import UserProfileSerializer


def index():
    return 'hola mundo'


@api_view(['POST', 'GET'])
def login(request):
    user_profiles = UserProfile.objects.all()
    serializer = UserProfileSerializer(user_profiles, many=True)
    return Response(serializer.data)

    """ serializer = SnippetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) """
