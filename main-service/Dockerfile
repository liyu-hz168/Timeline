# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package.json ./
RUN npm install

COPY . .

# Expose app port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
