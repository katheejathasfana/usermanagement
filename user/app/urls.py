

from django.urls import path
from django.urls import path
from app import views

urlpatterns = [
    path('', views.Login.as_view(), name='login'),
    path('signup', views.RegisterAPI.as_view()),
    path('profile',views.profile.as_view()),
    path('logout',views.Logout.as_view()),
    path('edit',views.EditProfile.as_view(),name='edit'),
    path('admin',views.adminlogin.as_view(), name='admin'),
    path('dashboard', views.Dashboard.as_view()),
    path('delete/<int:id>/', views.deleteuser.as_view(), name='delete'),
    path('adduser/', views.RegisterAPI.as_view())
    
    
    
]
