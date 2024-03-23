# Use the official Node.js LTS (Long Term Support) Alpine image as base
FROM node:14-alpine

# Set the working directory within the container
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Set the command to run the Next.js application
CMD ["npm", "start"]
