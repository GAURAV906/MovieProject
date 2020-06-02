from django.contrib import admin
from movies.models import Movie

# Register your models here.


class MovieAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'desc', 'rating']
    list_filter = ['title']
    search_fields = ['title']


admin.site.register(Movie, MovieAdmin)