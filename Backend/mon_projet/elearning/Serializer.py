from rest_framework import serializers
from .models import User,Historique


class UserSerializer(serializers.ModelSerializer):
      class Meta:
         model = User
         fields = ['id','email','username','role','password']
         extra_kwargs = {"password": {"write_only": True}}

      def create(self, validated_data):
            password = validated_data.pop('password')
            user = User(**validated_data)
            user.set_password(password)  
            user.save()
            return user
      
class HistoriqueSerializer(serializers.ModelSerializer):
     class Meta:
          model = Historique
          fields= ['id','author_id','text','created_at','is_hate','categories']