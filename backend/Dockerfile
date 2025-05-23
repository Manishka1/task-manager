# Use official Node.js image
FROM node:16

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose backend port
EXPOSE 5000

# Start in dev mode (nodemon) or prod mode (node)
CMD ["npm", "run", "dev"] 
