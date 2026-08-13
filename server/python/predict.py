import sys
import json
import os

import torch
from PIL import Image
from transformers import (
    ViTForImageClassification,
    AutoImageProcessor
)


# ==========================================
# Configuration
# ==========================================

BASE_MODEL = "google/vit-base-patch16-224-in21k"

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "models",
    "deepguard_vit_epoch2.pt"
)


# ==========================================
# Check command-line argument
# ==========================================

if len(sys.argv) < 2:
    print(json.dumps({
        "error": "Image path is required"
    }))
    sys.exit(1)


image_path = sys.argv[1]


# ==========================================
# Device
# ==========================================

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# ==========================================
# Load processor
# ==========================================

processor = AutoImageProcessor.from_pretrained(
    BASE_MODEL
)


# ==========================================
# Load model architecture
# ==========================================

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


# ==========================================
# Load our trained weights
# ==========================================

checkpoint = torch.load(
    MODEL_PATH,
    map_location=device
)

model.load_state_dict(
    checkpoint["model_state_dict"]
)

model.to(device)
model.eval()


# ==========================================
# Load image
# ==========================================

try:
    image = Image.open(image_path).convert("RGB")

except Exception as e:
    print(json.dumps({
        "error": f"Could not open image: {str(e)}"
    }))
    sys.exit(1)


# ==========================================
# Preprocess image
# ==========================================

inputs = processor(
    images=image,
    return_tensors="pt"
)

pixel_values = inputs["pixel_values"].to(device)


# ==========================================
# Prediction
# ==========================================

with torch.no_grad():

    outputs = model(
        pixel_values=pixel_values
    )

    probabilities = torch.softmax(
        outputs.logits,
        dim=1
    )[0]


real_probability = probabilities[0].item()
ai_probability = probabilities[1].item()


# ==========================================
# Determine prediction
# ==========================================

if ai_probability > real_probability:

    prediction = "AI-GENERATED"
    confidence = ai_probability

else:

    prediction = "REAL"
    confidence = real_probability


# ==========================================
# Risk level
# ==========================================

# ==========================================
# Risk level
# ==========================================

if ai_probability >= 0.70:
    risk = "High"

elif ai_probability >= 0.30:
    risk = "Medium"

else:
    risk = "Low"


# ==========================================
# Summary
# ==========================================

if prediction == "AI-GENERATED":

    summary = (
        "The trained DeepGuard AI model detected "
        "patterns associated with AI-generated imagery."
    )

else:

    summary = (
        "The trained DeepGuard AI model detected "
        "patterns more consistent with a real image."
    )


# ==========================================
# Final JSON response
# ==========================================

result = {
    "prediction": prediction,
    "confidence": round(confidence * 100, 2),
    "risk": risk,
    "realProbability": round(real_probability * 100, 2),
    "aiProbability": round(ai_probability * 100, 2),
    "summary": summary
}


print(json.dumps(result))