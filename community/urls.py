from django.urls import path
from . import views

urlpatterns = [
    path('communities/', views.getAll),
    path('communities/create/', views.create),
    path('communities/<int:id>', views.getById),
    path('communities/update/<int:id>', views.update),
    path('communities/delete/<int:id>', views.delete),
]