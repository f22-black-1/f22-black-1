# Give base image access to npm and node
FROM node:14

# Refernce the working directory with "."
WORKDIR /usr/src/app

# Install app dependencies into WORKDIR inside the image
# A wildcard is used to ensure both package.json AND package-lock.json
# are copied where available (npm@5+)
COPY package*.json .

# Install any needed packages using npm install
RUN npm i

# Bundle app source by copying everything in WORKDIR that is not in .dockerignore
COPY . .

# This port only gets exposed when we specify in the 
# `docker run` command using the -p parameter
EXPOSE 4200

# Default command; can be overriden by specifying another command in `docker run`
CMD [ "npm", "start"]