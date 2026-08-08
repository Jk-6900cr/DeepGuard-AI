from transformers import pipeline
from PIL import Image

print("Loading AI detection model...")

detector = pipeline(
    "image-classification",
    model="prithivMLmods/deepfake-detector-model-v1"
)

print("Model loaded successfully!")

image_path = r"C:\DeepGuard-AI\server\uploads\1786196444872.png"

image = Image.open(image_path)

result = detector(image)

print("Prediction:")
print(result)