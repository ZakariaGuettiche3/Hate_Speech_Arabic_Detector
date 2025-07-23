# Hate_Speech_Arabic_Detector


A full-stack web application to detect Arabic hate speech using a deep learning model built with **PyTorch** and **Hugging Face Transformers**. The app includes a **Django REST API backend** and a **React-based frontend** for real-time predictions and user interaction.

---

## Features

- Cleaned and labeled Arabic hate speech dataset
- Transformer-based NLP model for text classification
- Preprocessing, training, and evaluation in Python
- REST API to serve the model (Django)
- Interactive web UI (React)

---

## Data Preprocessing

Notebook: `HateSpeechDataProcessing.ipynb`

- Load CSV dataset
- Handle missing values
- Normalize and clean labels
- Visualize class distributions

---

## Model Training

Notebook: `modelCode.ipynb`

- Tokenize text using `asafaya/bert-base-arabic`
- Train classifier with PyTorch
- Evaluate accuracy and F1-score
- Save model and tokenizer for inference

---

## App

- Django For Backend
- React For Frontend

## Future Work

Add voice recognizer for Arabic hate speech

Real-time detection of hate speech in TikTok streams

Add interactive dashboard to visualize hate speech trends per month/year across social media

Integrate multilingual support (e.g., English, French)

Add user reporting and moderation system

Deploy full-stack app with CI/CD and cloud hosting

## NB:
The trained model files are stored in the following paths:

Backend/mon_projet/elearning/model.pth — main classifier model

Backend/mon_projet/elearning/Category_model.pth — category classifier model

Due to GitHub’s file size limits (100MB), these .pth files are managed with Git LFS.
To use them, make sure Git LFS is installed on your machine
