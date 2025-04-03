FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM httpd:latest
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build /app/dist/parc/ ./
RUN mv browser/* . && rmdir browser
