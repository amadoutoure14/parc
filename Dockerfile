FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install

COPY localhost.crt .
COPY localhost.key .

EXPOSE 4300

CMD ["ng", "serve",
     "--host", "0.0.0.0",
     "--port", "4300",
     "--ssl", "true",
     "--ssl-cert", "./localhost.crt",
     "--ssl-key", "./localhost.key",
     "--configuration=production"]
