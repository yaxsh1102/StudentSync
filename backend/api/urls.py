
from django.urls import path
from .views import *

urlpatterns = [
    path('getotp/', GetOtpView.as_view(), name='getotp'),
    path('google-auth/', GoogleAuthView.as_view(), name='google_auth'),
    path('login/',LoginView.as_view()),
    path('signup/',SignupView.as_view()),
    path('getuserdata/',GetUserDataView.as_view()),
    path('createevent/',CreateEventView.as_view()),
    path('events/',EventView.as_view()),
    path('geteventdetails/',GetEventDetail.as_view()),
]