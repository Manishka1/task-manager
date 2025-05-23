FROM node:16

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose Vite default port
EXPOSE 5173

# Run the Vite dev server, listen on all interfaces
CMD ["npm","run","dev","--","--host","0.0.0.0"]