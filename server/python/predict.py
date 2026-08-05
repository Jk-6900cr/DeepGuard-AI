import sys
import json

# Image path received from Node.js
image_path = sys.argv[1]

# Dummy response (we'll replace this with the real AI model later)
result = {
    "prediction": "Authentic",
    "confidence": 96.4,
    "risk": "Low",
    "summary": f"No manipulation detected in {image_path}"
}

print(json.dumps(result))