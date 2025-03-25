FROM node:latest AS build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/parc /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
