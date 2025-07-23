#VERSION 0

from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import re
import numpy as np
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


def extraire_nombres(chaine):
    return ''.join(c for c in chaine if c.isdigit())
objet_json ={}
 
def replace(str,id,cursser):
    pattern = r"aweme_id=\d+"
    pattern2 = r"cursor=\d+"
    search_result = re.findall(pattern, str) , re.findall(pattern2,str)
    return str.replace(search_result[0][0],f"aweme_id={id}").replace(search_result[1][0],f"cursor={cursser}")

def req(stred,url,cursser):
    POST_ID = extraire_nombres(url.split('/')[-1])
    driver = webdriver.Chrome()
    stred = replace(stred,POST_ID,cursser)
    try:
        driver.get(stred)
        texte = None
        try:
            body_content = driver.find_element(By.TAG_NAME, "pre").get_attribute('innerHTML')
            texte = str(body_content)
        except Exception as e:
            pass
        
        if texte != None:
            objet_json = json.loads(texte)
            return objet_json

    finally:
         driver.quit()
         
        


def parser(data):
    comment = np.array([])
    if data:
        coment = data['comments']
        for cm in coment:
            comment = np.append(comment,cm['text'])
            print(comment)
            print('#' * 100)
            #comment = np.append(comment,cm['reply_comment'])
        return data,comment



def final(stre,url):
    comment = np.array([])
    cursser=0
    while True:
      
      data = req(stre,url,cursser)
     
      if data: 
           same_data, comment = parser(data)[0],np.append(comment,parser(data)[1])
           cursser = same_data['cursor']
           if same_data['has_more']==1:
               print(data['has_more'])
               print(cursser)
           else:
               break
      else:
       break
    return comment

def is_null(x):
    return x is None or (isinstance(x, float) and np.isnan(x)) or (isinstance(x, str) and x.strip() == '')

@api_view(['POST'])
@permission_classes([AllowAny])
def tiktok(request):
    st = request.data.get("st")
    url = request.data.get("url")
    comment_tiktok = final(st,url)
    cleand = np.array([clean_text(x) for x in comment_tiktok])
    cleand = np.array([remove_stopwords(x) for x in cleand])
    cleand = np.array([x for x in cleand if not is_null(x)])
    return Response({
        "comment": cleand
    })


