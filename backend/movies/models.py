from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class Movie(models.Model):
    title = models.CharField(max_length=100)
    desc = models.TextField()
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    def __str__(self):
        return self.title
