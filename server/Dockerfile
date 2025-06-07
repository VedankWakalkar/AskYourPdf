FROM node:18

# Set working directory
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

EXPOSE 5000

# Default command (can be overridden via docker-compose)
CMD ["node", "app.js"]
