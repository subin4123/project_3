# Use official Node.js image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (default for your Node.js app)
EXPOSE 3000

# Run the Node.js app
CMD ["npm", "start"]

