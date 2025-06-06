FROM node:22-alpine AS build

WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]

RUN --mount=type=cache,target=/root/.yarn yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:stable-alpine

EXPOSE 80

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./prod/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

COPY prod/start.sh .

RUN chmod +x start.sh

CMD [ "sh", "./start.sh" ]
