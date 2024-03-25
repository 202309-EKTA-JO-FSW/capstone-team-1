FROM node:14

RUN mkdir -p /backend-app
WORKDIR /backend-app/
COPY package.json .
RUN npm install
WORKDIR /backend-app/server
COPY ./server ./server
CMD [ "npm", "run", "start:app" ]

# FROM node:14

# # Create the directory structure
# WORKDIR /backend-app

# # Copy package.json and install dependencies
# COPY package.json .
# RUN npm install

# # Copy the entire server directory
# COPY server ./server

# # Set the working directory to the server directory
# WORKDIR /backend-app/server

# # Expose the port your app runs on
# EXPOSE 3000

# # Command to run the server
# CMD ["npm", "run", "start:app"]
