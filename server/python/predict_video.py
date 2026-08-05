import sys
import json

# Video path received from Node.js
video_path = sys.argv[1]

# Dummy response
result = {
    "prediction": "Authentic",
    "confidence": 95.2,
    "risk": "Low",
    "summary": f"No manipulation detected in {video_path}"
}

print(json.dumps(result))