import sys
import json
import os
import cv2
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

# Number of frames to analyze
NUM_FRAMES = 10


# ==========================================
# Check command-line argument
# ==========================================

if len(sys.argv) < 2:
    print(json.dumps({
        "error": "Video path is required"
    }))
    sys.exit(1)

video_path = sys.argv[1]


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
# Load model
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
# Load trained weights
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
# Open video
# ==========================================

video = cv2.VideoCapture(video_path)

if not video.isOpened():
    print(json.dumps({
        "error": "Could not open video"
    }))
    sys.exit(1)


total_frames = int(
    video.get(cv2.CAP_PROP_FRAME_COUNT)
)


fps = video.get(
    cv2.CAP_PROP_FPS
)


# ==========================================
# Validate video
# ==========================================

if total_frames <= 0:

    video.release()

    print(json.dumps({
        "error": "Could not read video frames"
    }))

    sys.exit(1)


# ==========================================
# Select frame positions
# ==========================================

frame_positions = torch.linspace(
    0,
    total_frames - 1,
    steps=min(NUM_FRAMES, total_frames)
).long().tolist()


ai_probabilities = []
real_probabilities = []

frames_analyzed = 0


# ==========================================
# Analyze selected frames
# ==========================================

for frame_number in frame_positions:

    video.set(
        cv2.CAP_PROP_POS_FRAMES,
        frame_number
    )

    success, frame = video.read()

    if not success:
        continue


    # OpenCV BGR → RGB

    frame_rgb = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )


    image = Image.fromarray(
        frame_rgb
    )


    # Preprocess

    inputs = processor(
        images=image,
        return_tensors="pt"
    )


    pixel_values = inputs[
        "pixel_values"
    ].to(device)


    # Model prediction

    with torch.no_grad():

        outputs = model(
            pixel_values=pixel_values
        )

        probabilities = torch.softmax(
            outputs.logits,
            dim=1
        )[0]


    real_probability = probabilities[
        0
    ].item()

    ai_probability = probabilities[
        1
    ].item()


    real_probabilities.append(
        real_probability
    )

    ai_probabilities.append(
        ai_probability
    )

    frames_analyzed += 1


video.release()


# ==========================================
# Check analyzed frames
# ==========================================

if frames_analyzed == 0:

    print(json.dumps({
        "error": "No video frames could be analyzed"
    }))

    sys.exit(1)


# ==========================================
# Calculate average probabilities
# ==========================================

average_real_probability = (
    sum(real_probabilities)
    / len(real_probabilities)
)


average_ai_probability = (
    sum(ai_probabilities)
    / len(ai_probabilities)
)


# ==========================================
# Final prediction
# ==========================================

if (
    average_ai_probability
    > average_real_probability
):

    prediction = "AI-GENERATED"

    confidence = (
        average_ai_probability
    )

else:

    prediction = "REAL"

    confidence = (
        average_real_probability
    )


# ==========================================
# Risk
# ==========================================

if average_ai_probability >= 0.70:

    risk = "High"

elif average_ai_probability >= 0.30:

    risk = "Medium"

else:

    risk = "Low"


# ==========================================
# Summary
# ==========================================

if prediction == "AI-GENERATED":

    summary = (
        f"The trained DeepGuard AI model "
        f"detected patterns associated with "
        f"AI-generated content across "
        f"{frames_analyzed} analyzed video frames."
    )

else:

    summary = (
        f"The trained DeepGuard AI model "
        f"detected patterns more consistent "
        f"with authentic content across "
        f"{frames_analyzed} analyzed video frames."
    )


# ==========================================
# Final result
# ==========================================

result = {

    "prediction": prediction,

    "confidence": round(
        confidence * 100,
        2
    ),

    "risk": risk,

    "realProbability": round(
        average_real_probability * 100,
        2
    ),

    "aiProbability": round(
        average_ai_probability * 100,
        2
    ),

    "framesAnalyzed": frames_analyzed,

    "totalFrames": total_frames,

    "fps": round(fps, 2),

    "summary": summary
}


print(
    json.dumps(result)
)