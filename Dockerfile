# syntax=docker/dockerfile:1.4

FROM node:18 AS build

WORKDIR /flashcards-online

COPY ./flashcards-online/package.json ./package.json
COPY ./flashcards-online/package-lock.json ./package-lock.json

RUN [ "npm", "install" ]

COPY ./flashcards-online ./

RUN [ "npm", "run", "build" ]

FROM nginx:alpine

COPY --from=build /flashcards-online/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

RUN mkdir ./flashcards

COPY --from=build /flashcards-online/dist ./flashcards

ENTRYPOINT ["nginx", "-g", "daemon off;"]
