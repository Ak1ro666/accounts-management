FROM node:lts-alpine3.14

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
