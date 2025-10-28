# syntax=docker/dockerfile:1
# Build stage
FROM node:22-bullseye AS builder

WORKDIR /app

# Install build dependencies if needed
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    git \
    && rm -rf /var/lib/apt/lists/*

# Enable corepack and set up yarn
RUN corepack enable && corepack prepare yarn@4.5.1 --activate

# Copy package files for dependency layer caching
COPY package.json yarn.lock ./

# Configure yarn
RUN yarn config set enableGlobalCache false

# Install ALL dependencies (including dev dependencies for build)
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn config set cacheFolder /usr/local/share/.cache/yarn && \
    yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN yarn build

# Production stage
FROM node:22-bullseye

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Enable corepack
RUN corepack enable

# Copy package files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn config set cacheFolder /usr/local/share/.cache/yarn && \
    yarn install --frozen-lockfile --production

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Create directory for uploads
RUN mkdir -p uploads

# Set environment to production
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["yarn", "start"]

