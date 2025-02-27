FROM node:latest as build

WORKDIR /usr/local/parc

COPY ./ /usr/local/parc/

RUN npm install

RUN npm run build --prod

FROM nginx:latest

COPY --from=build /usr/local/parc/dist/parc /usr/share/nginx/html

EXPOSE 4200
