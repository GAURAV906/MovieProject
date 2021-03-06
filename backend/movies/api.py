from movies.serializers import MovieSerializer
from movies.models import Movie
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.core.paginator import Paginator
from django.http.response import JsonResponse
from knox.auth import TokenAuthentication


class MovieViewset(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_all_movies(self, request):
        queryset = Movie.objects.all()

        paginator = Paginator(queryset, 4)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        serializer = MovieSerializer(page_obj, many=True)
        
        print("This is serialiser data " + str(serializer))
        return Response(serializer.data)

    def get_movie(self, request, pk):
        queryset = Movie.objects.get(pk=pk)
        serializer = MovieSerializer(queryset, many=False)
        return Response(serializer.data)

    def create_movie(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete_movie(self, request, pk):
        queryset = Movie.objects.get(pk=pk)
        queryset.delete()

        queryset = Movie.objects.all()

        paginator = Paginator(queryset, 4)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        serializer = MovieSerializer(page_obj, many=True)

        return Response(serializer.data)

    def update_movie(self, request, pk):
        queryset = Movie.objects.get(pk=pk)
        serializer = MovieSerializer()       
        serializer.update(instance=queryset, validated_data=request.data)

        queryset = Movie.objects.get(pk=pk)
        serializer = MovieSerializer(queryset, many=False)
        return Response(serializer.data)
        
