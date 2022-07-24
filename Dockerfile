# starting from node base image
FROM node:14-alpine

# chaging the working directory
WORKDIR /app

# copying package & yarn files and installing dependecies
COPY package.json .
COPY yarn.lock .
RUN yarn install 

# copying rest of the files
COPY . .

# starting the server
CMD [ "node", "index.js" ]