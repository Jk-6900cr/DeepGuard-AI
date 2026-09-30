# 🛡️ DeepGuard AI

### AI-Powered Deepfake Detection Platform

DeepGuard AI is a full-stack AI-powered platform that analyzes images and videos to determine whether they are **real or AI-generated**.

The project combines a React frontend, Node.js/Express backend, MongoDB database, and a Python-based deep learning model using a Vision Transformer (ViT).

---

## 🚀 Features

- 🔐 User Authentication
- 🖼️ AI Image Deepfake Detection
- 🎥 Video Deepfake Detection
- 📊 Confidence Score
- ⚠️ Risk Level
- 📈 User Dashboard
- 🕒 Scan History
- 📄 Detection Reports
- 📱 Responsive UI
- ☁️ Cloud Deployment

---

## 🧠 How It Works

```text
User
  ↓
React Frontend
  ↓
Node.js + Express API
  ↓
File Upload
  ↓
Python AI Pipeline
  ↓
Vision Transformer (ViT)
  ↓
AI Detection
  ↓
Prediction + Confidence + Risk
  ↓
MongoDB
  ↓
Result / Report
🛠️ Tech Stack
Frontend
React
Vite
Tailwind CSS
React Router
Backend
Node.js
Express.js
Multer
REST APIs
JWT Authentication
Database
MongoDB
MongoDB Atlas
AI / Machine Learning
Python
PyTorch
Hugging Face Transformers
Vision Transformer (ViT)
OpenCV
Pillow
Deployment
Render
Hugging Face Hub
MongoDB Atlas
🧠 AI Model

DeepGuard AI uses a Vision Transformer (ViT) for binary image classification.

Base Model:

google/vit-base-patch16-224-in21k

Classification:

0 → REAL
1 → AI-GENERATED

The trained model is hosted on Hugging Face because the model file is approximately 982 MB.

☁️ Deployment

DeepGuard AI is deployed using separate services:

Component	Technology
Frontend	React + Vite
Frontend Hosting	Render
Backend	Node.js + Express
Backend Hosting	Render
Database	MongoDB Atlas
AI Model	PyTorch + ViT
Model Hosting	Hugging Face
🚧 Project Status

Development completed with cloud deployment configured.

The frontend and backend are deployed, MongoDB Atlas is connected, and the trained AI model is hosted on Hugging Face.

The current free backend hosting environment has limited memory for loading the approximately 982 MB PyTorch model. A higher-memory environment or optimized model-serving setup is required for reliable production AI inference.

👨‍💻 Author

Jashan Kumar

Computer Science & Engineering Student

🛡️ DeepGuard AI

Detect. Analyze. Understand.


### Why I recommend this version

It gives an interviewer the complete picture in **about 1–2 minutes**:

**Problem → Features → Architecture → Technologies → AI model → Deployment → Current limitation → Author**

That's much better than either:
- ❌ a tiny README with only 2 sections, or
- ❌ a massive documentation-style README.

For a **college portfolio/GitHub project**, this medium version is the sweet spot.
