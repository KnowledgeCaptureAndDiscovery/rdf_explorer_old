FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY yarn.lock ./
COPY package.json ./
RUN yarn install
COPY . .
COPY --chown=node:node . .

USER node
EXPOSE 8080
CMD [ "node", "server.js" ]
