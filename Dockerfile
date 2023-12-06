FROM node:18.3.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN chown -R node /usr/src/app
RUN npm install
COPY . .
CMD [ "npm", "start" ]