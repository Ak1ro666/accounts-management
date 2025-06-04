FROM node:20-alpine

WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]

RUN --mount=type=cache,target=/root/.yarn yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 8000

RUN chmod +x start.sh

CMD [ "sh", "./start.sh" ]
