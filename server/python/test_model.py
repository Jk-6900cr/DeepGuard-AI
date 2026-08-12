import sys
import torch
from transformers import (
    ViTForImageClassification,
    AutoImageProcessor
)
from PIL import Image

MODEL_PATH = "python/models/deepguard_vit_epoch2.pt"
BASE_MODEL = "google/vit-base-patch16-224-in21k"

# -----------------------------------
# Check image argument
# -----------------------------------

if len(sys.argv) < 2:
    print("Usage: python python/test_model.py <image_path>")
    sys.exit(1)

image_path = sys.argv[1]

# -----------------------------------
# Load processor
# -----------------------------------

print("Loading processor...")

processor = AutoImageProcessor.from_pretrained(
    BASE_MODEL
)

# -----------------------------------
# Load model architecture
# -----------------------------------

print("Loading model...")

model = ViTForImageClassification.from_pretrained(
    BASE_MODEL,
    num_labels=2,
    id2label={
        0: "REAL",
        1: "AI-GENERATED"
    },
    label2id={
        "REAL": 0,
        "AI-GENERATED": 1
    },
    ignore_mismatched_sizes=True
)

# -----------------------------------
# Load trained weights
# -----------------------------------

checkpoint = torch.load(
    MODEL_PATH,
    map_location="cpu"
)

model.load_state_dict(
    checkpoint["model_state_dict"]
)

model.eval()

print("Model loaded successfully!")

# -----------------------------------
# Load image
# -----------------------------------

image = Image.open(image_path).convert("RGB")

print("Image loaded:", image.size)

# -----------------------------------
# Process image
# -----------------------------------

inputs = processor(
    images=image,
    return_tensors="pt"
)

# -----------------------------------
# Prediction
# -----------------------------------

with torch.no_grad():

    outputs = model(
        pixel_values=inputs["pixel_values"]
    )

    probabilities = torch.softmax(
        outputs.logits,
        dim=1
    )[0]

# -----------------------------------
# Get results
# -----------------------------------

real_probability = probabilities[0].item()
ai_probability = probabilities[1].item()

if ai_probability > real_probability:
    prediction = "AI-GENERATED"
    confidence = ai_probability
else:
    prediction = "REAL"
    confidence = real_probability

print("\n==============================")
print("DeepGuard Prediction")
print("==============================")

print("Prediction:", prediction)
print(f"Confidence: {confidence * 100:.2f}%")

print(f"REAL: {real_probability * 100:.2f}%")
print(f"AI-GENERATED: {ai_probability * 100:.2f}%")