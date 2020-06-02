"""MovieProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from movies.api import MovieViewset

admin.site.site_header = "Movie Admin"
admin.site.site_title = "Movie Admin"
admin.site.index_title = ""

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'movies/', MovieViewset.as_view({'get': 'get_all_movies'})),
    path(r'movies/<int:pk>/', MovieViewset.as_view({'get': 'get_movie'})),
    path(r'movies/<int:pk>/delete/', MovieViewset.as_view({'delete': 'delete_movie'})),
    path(r'movies/create/', MovieViewset.as_view({'post': 'create_movie'})),
    path(r'movies/<int:pk>/update/', MovieViewset.as_view({'post': 'update_movie'})),
]
