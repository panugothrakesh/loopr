# syntax=docker/dockerfile:1
# Build stage
FROM node:22-bullseye AS builder

WORKDIR /app

# Install build dependencies for native modules (if needed)
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Enable corepack and set up yarn
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Copy package files for dependency layer caching
COPY package.json yarn.lock .yarnrc.yml ./

# Configure yarn and install dependencies with cache mount
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn config set globalFolder /usr/local/share/.cache/yarn && \
    yarn install --immutable

# Set build environment
ENV NODE_ENV=production
ENV CI=true
ENV GENERATE_SOURCEMAP=false

# Performance optimizations
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV UV_THREADPOOL_SIZE=64

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM nginx:1.27-alpine AS production

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Configure nginx for SPA with optimized caching
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    \n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    \n\
    # Enable gzip compression\n\
    gzip on;\n\
    gzip_vary on;\n\
    gzip_min_length 1024;\n\
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;\n\
    \n\
    # SPA routing - try files, fallback to index.html\n\
    location / {\n\
    try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    # Cache static assets\n\
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {\n\
    expires 1y;\n\
    add_header Cache-Control "public, immutable";\n\
    }\n\
    \n\
    # Security headers\n\
    add_header X-Frame-Options "SAMEORIGIN" always;\n\
    add_header X-Content-Type-Options "nosniff" always;\n\
    add_header X-XSS-Protection "1; mode=block" always;\n\
    \n\
    # Health check endpoint\n\
    location /health {\n\
    access_log off;\n\
    return 200 "healthy\\n";\n\
    add_header Content-Type text/plain;\n\
    }\n\
    }\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
