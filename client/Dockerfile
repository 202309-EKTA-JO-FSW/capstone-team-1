FROM node:18-alpine

WORKDIR /usr/src/app/client

COPY package*.json ./
RUN npm install

COPY . .

# Build your Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run your Next.js application
CMD [ "npm", "start" ]
