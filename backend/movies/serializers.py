from movies.models import Movie
from rest_framework import serializers


class MovieSerializer(serializers.ModelSerializer):

    title = serializers.CharField()
    desc = serializers.CharField()

    class Meta:
        model = Movie
        fields = ('id', 'title', 'desc', 'rating')

    def to_representation(self, value):
        data = {
                "id": value.pk,
                "title": value.title,
                "description": value.desc,
                "rating": value.rating
        }
        return data