from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .user_profile_manager import UserProfileManager
user_profiles = UserProfileManager()


@api_view(['GET'])
def index(request):
    return Response(user_profiles.get_all())


@api_view(['GET'])
def get_profile(request, id):
    return Response(user_profiles.get_by_id(id))
