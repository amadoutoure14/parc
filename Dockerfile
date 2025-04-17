FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
FROM nginx:latest
COPY --from=build /app/dist/parc/ /usr/share/nginx/html/
EXPOSE 4300
