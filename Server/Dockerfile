FROM node:20-alpine

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app source code
COPY . .

# Expose port
EXPOSE 5001

# Set production environment
ENV NODE_ENV=production
ENV PORT=5001

CMD ["node", "src/index.js"]
