FROM node

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE 8080

CMD ["node", "app.js"]