# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Install sharp dependencies
RUN apt-get update && apt-get install -y \
  libvips-dev

# Copy the local code to the container image.
COPY . .

# Expose the port the app runs on.
EXPOSE 3010

# Run the web service on container startup.
CMD [ "npm", "start" ]