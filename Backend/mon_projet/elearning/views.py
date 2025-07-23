from django.shortcuts import render
from elearning.Serializer import UserSerializer,HistoriqueSerializer
from rest_framework.views import APIView
from   rest_framework import status

from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view , permission_classes
import datetime
from rest_framework.exceptions import AuthenticationFailed
import jwt
from .models import User,Historique
import torch
from transformers import BertForSequenceClassification, BertTokenizer, BertConfig
import torch
from transformers import BertTokenizer, BertConfig, BertForSequenceClassification
from rest_framework_simplejwt.tokens import RefreshToken
import re
from nltk.corpus import stopwords
from pyarabic import araby
def remove_diacritics(text):
    diacritics_pattern = re.compile(r'[\u064B-\u0652]')
    return re.sub(diacritics_pattern, '', text)

def ortho_normalize(text):
    text = text.replace('أ', 'ا')
    text = text.replace('إ', 'ا')
    text = text.replace('آ', 'ا')
    text = text.replace('ى', 'ي')
    text = text.replace('ة', 'ه')
    return text

def clean_text(text):
    if isinstance(text, str):
        text = re.sub(r"http\S+|www\S+", "", text)
        text = re.sub(r"@\w+", "", text)
        text = re.sub(r"#\w+", "", text)
        text = re.sub(r'[^\u0600-\u06FF\s]|[\d٠-٩]', '', text)
        text = re.sub(r"[^\w\s]", "", text)
        text = remove_diacritics(text)
        text = ortho_normalize(text)
        text = araby.normalize_hamza(text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()
    return ""

# Stopwords arabes
arabic_stopwords = set(stopwords.words('arabic'))

def remove_stopwords(text):
    words = text.split()
    filtered_words = [word for word in words if word not in arabic_stopwords]
    return " ".join(filtered_words)


MODEL_PATH = "C:/Users/DELL/Desktop/base/mon_projet/elearning/model.pth"
MODEL_PATH2 = "C:/Users/DELL/Desktop/base/mon_projet/elearning/Category_model.pth"  # Exemple : "C:/Users/DELL/Desktop/base/mon_projet/model.pth"
TOKENIZER_NAME = "aubmindlab/bert-base-arabertv02"

config = BertConfig.from_pretrained(TOKENIZER_NAME)
model = BertForSequenceClassification(config)
state_dict = torch.load(MODEL_PATH, map_location=torch.device('cpu'), weights_only=False)
model.load_state_dict(state_dict)
model.eval()

model2 = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=5)
state_dict2 = torch.load(MODEL_PATH2, map_location=torch.device('cpu'))
model2.bert.embeddings.word_embeddings = torch.nn.Embedding(64000, 768)
missing_keys, unexpected_keys = model2.load_state_dict(state_dict2, strict=False)

model2.eval()



tokenizer = BertTokenizer.from_pretrained(TOKENIZER_NAME)
label_mapping = {0: "normal", 1: "hate"}
category_mapping = {
    0: "racisme",
    1: "identity-based",
    2: "gender_hate",
    3: "religion_hate",
    4: "appearance-based"
}


@api_view(['POST'])
@permission_classes([AllowAny])
def predict_view(request):
    text = request.data.get("text")
    text =  clean_text(text)
    text =  remove_stopwords(text)
    if not text:
        return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)

    with torch.no_grad():
        outputs = model(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()

    return Response({"prediction": label_mapping[prediction]})

@api_view(['POST'])
@permission_classes([AllowAny])
def predict_view_list(request):
    arr = request.data.get("text")
    valid = []
    for text in arr :
      text =  clean_text(text)
      text =  remove_stopwords(text)
      if not text:
        return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

      inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
      
      with torch.no_grad():
        outputs = model(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()
        cat = None
      if(label_mapping[prediction] == "hate"):
          with torch.no_grad():
           outputs = model2(**inputs)
           categori = torch.argmax(outputs.logits, dim=1).item()
           cat = category_mapping[categori]
      valid.append({
          'text': text,
          'ishate': label_mapping[prediction],
          'categories': cat
      })

    return Response({"prediction": valid})

@api_view(['POST'])
@permission_classes([AllowAny])
def predict_categories(request):
    text = request.data.get("text")
    text =  clean_text(text)
    text =  remove_stopwords(text)
    if not text:
        return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)

    with torch.no_grad():
        outputs = model2(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()

    return Response({"prediction": category_mapping[prediction]})



@permission_classes([AllowAny])
class registration(APIView):
       def post(self, request):
         serializer = UserSerializer(data=request.data)
         if serializer.is_valid():
             user = serializer.save()
             refresh = RefreshToken.for_user(user)
             return Response([serializer.data, {'access' : str(refresh.access_token)}] , status=status.HTTP_201_CREATED)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([AllowAny])
class login(APIView):
       def post(self, request):
             username = request.data.get('email')
             password = request.data.get('password')
             user = User.objects.filter(email = username).first()
             if user is None:
                    raise AuthenticationFailed('User Not Found')
             if not user.check_password(password):
                   raise AuthenticationFailed('Password Incorrect')
            #  # create token
             refresh = RefreshToken.for_user(user)
             reponse = Response()
             reponse.set_cookie('token', user, httponly=True)
             reponse.data= {
                   'refresh': str(refresh),
                   'access': str(refresh.access_token),
                   'user_email': user.email,
                   'id': user.id,
                   'username': user.username
             }
             return reponse
       
@permission_classes([IsAuthenticated])
class historique(APIView):
      def post(self,request):
           data = HistoriqueSerializer(data=request.data)
           if data.is_valid():
                data.save()
                return Response(data.data, status=status.HTTP_201_CREATED)
           return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
           

@api_view(['POST'])
@permission_classes([AllowAny])
def gethistorique(request):
       q = 'SELECT * FROM public.elearning_historique where author_id_id = %s'
       v=[request.data.get('id')]
       histor = Historique.objects.raw(q,v)
       respons = HistoriqueSerializer(histor,many=True).data
       return Response(respons)


@api_view(['POST'])
@permission_classes([AllowAny])
def delete_historique(request):
    try:
        historique = Historique.objects.get(id=request.data['id'])
        historique.delete()  
        return Response({"message": "Historique supprimé avec succès."}, status=status.HTTP_200_OK)
    except Historique.DoesNotExist:
        return Response({"error": "Historique non trouvé."}, status=status.HTTP_404_NOT_FOUND)
