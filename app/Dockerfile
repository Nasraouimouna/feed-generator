# Client App
FROM node:12 as builder
ARG env=prod
LABEL authors="Ferid HELALI"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --silent
RUN npm install @angular/cli@8.x -g

COPY . .
RUN npm run --aot build:$env
EXPOSE 8080
CMD ["npm","start"]
