from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            # authentication success
            return Response({"message": "verified"}, status=status.HTTP_200_OK)
        else:
            # authentication failure :(
            return Response({"message": "invalid credentials"}, status = status.HTTP_401_UNAUTHORIZED)


