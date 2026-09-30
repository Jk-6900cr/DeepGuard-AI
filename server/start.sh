#!/bin/bash

set -e

MODEL_DIR="/app/python/models"
MODEL_FILE="$MODEL_DIR/deepguard_vit_epoch2.pt"

echo "=========================================="
echo "DeepGuard AI Startup"
echo "=========================================="

mkdir -p "$MODEL_DIR"

if [ -f "$MODEL_FILE" ]; then
    echo "✅ DeepGuard model already exists."
else
    echo "⬇️ Downloading DeepGuard trained model..."

    if [ -z "$HF_TOKEN" ]; then
        echo "❌ HF_TOKEN environment variable is missing."
        exit 1
    fi

    python3 -c "from huggingface_hub import hf_hub_download; hf_hub_download(repo_id='Jk-59/deepguard-vit-model', filename='deepguard_vit_epoch2.pt', token='$HF_TOKEN', local_dir='$MODEL_DIR')"

    echo "✅ DeepGuard model downloaded successfully."
fi

echo "🚀 Starting DeepGuard backend..."

exec node app.js