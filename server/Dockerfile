# ==========================================
# DeepGuard AI Backend
# Node.js + Python AI Model
# ==========================================

FROM node:20-bookworm

# Install Python and required system packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# ==========================================
# Install Node dependencies
# ==========================================

COPY server/package*.json ./

RUN npm ci --omit=dev

# ==========================================
# Install Python dependencies
# ==========================================

COPY server/python/requirements.txt ./python/requirements.txt

RUN pip3 install --no-cache-dir --break-system-packages \
    -r ./python/requirements.txt

# Download DeepGuard trained model from private Hugging Face repository
RUN python3 -c "from huggingface_hub import hf_hub_download; hf_hub_download(repo_id='Jk-59/deepguard-vit-model', filename='deepguard_vit_epoch2.pt', token='${HF_TOKEN}', local_dir='/app/python/models')"
# ==========================================
# Copy backend
# ==========================================

COPY server/ ./

# Create upload directories
RUN mkdir -p uploads uploads/videos

# ==========================================
# Environment
# ==========================================

ENV NODE_ENV=production

# Backend port
EXPOSE 5000

# ==========================================
# Start server
# ==========================================

CMD ["node", "app.js"]