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

# Pre-download Hugging Face model during image build
RUN python3 -c "from transformers import AutoImageProcessor, ViTForImageClassification; AutoImageProcessor.from_pretrained('google/vit-base-patch16-224-in21k'); ViTForImageClassification.from_pretrained('google/vit-base-patch16-224-in21k')"
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