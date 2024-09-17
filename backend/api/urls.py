
from django.urls import path
from .views import *

urlpatterns = [
    path('getotp/', GetOtpView.as_view()),
    path('google-auth/', GoogleAuthView.as_view()),
    path('login/',LoginView.as_view()),
    path('signup/',SignupView.as_view()),
    path('getuserdata/',GetUserDataView.as_view()),
    path('createevent/',CreateEventView.as_view()),
    path('events/',EventView.as_view()),
    path('geteventdetails/',GetEventDetail.as_view()),
    path('createroom/',CreateRoomView.as_view()),
    path('getrooms/',RoomView.as_view()),
    path('deleteroom/',DeleteRoomView.as_view()),
    path('getroomdetails/',GetRoomDetail.as_view()),
    path('getprofile/',ProfileView.as_view()),
    path('updateprofile/',UpdateProfileView.as_view()),
    
]

