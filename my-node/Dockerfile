# Use slim image to reduce build time
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy only package files to leverage Docker cache
COPY package*.json ./

# Install dependencies using npm ci for faster, cleaner install
RUN npm ci

# Now copy the full source code
COPY . .

# Expose app port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]

