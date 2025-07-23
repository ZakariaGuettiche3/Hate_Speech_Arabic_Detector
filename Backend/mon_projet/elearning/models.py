from django.db import models
from django.contrib.auth.models import  AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    username = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    USERNAME_FIELD = 'email' # 'email' si utilisé pour login
    REQUIRED_FIELDS = ['username']
    class Meta:
        db_table = 'user'
    def __str__(self):
        return self.email
    

class Historique(models.Model):
    id = models.AutoField(primary_key=True)
    author_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="historique") 
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  
    is_hate = models.BooleanField()
    categories = models.CharField(max_length=255)


class Tweets(models.Model):
    id = models.AutoField(primary_key=True) 
    categories = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  
    url = models.TextField()

    def __str__(self):
        return self.text


