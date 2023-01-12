FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY database.js app.js ./ 

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "node", "app.js" ]