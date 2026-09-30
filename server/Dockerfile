# ==========================================
# DeepGuard AI Backend
# Node.js + Python AI Model
# ==========================================

FROM node:20-bookworm

# ==========================================
# Install Python and system dependencies
# ==========================================

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# Working directory
# ==========================================

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

# ==========================================
# Copy backend
# ==========================================

COPY server/ ./

# ==========================================
# Create directories
# ==========================================

RUN mkdir -p uploads uploads/videos python/models

# ==========================================
# Startup script
# ==========================================

RUN chmod +x start.sh

# ==========================================
# Environment
# ==========================================

ENV NODE_ENV=production

EXPOSE 5000

# ==========================================
# Start DeepGuard
# ==========================================

CMD ["./start.sh"]