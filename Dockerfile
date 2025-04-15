FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
FROM nginx:latest
COPY --from=build /app/dist/parc/ /usr/share/nginx/html/

RUN if [ -d "/usr/share/nginx/html/browser" ]; then \
    mv /usr/share/nginx/html/browser/* /usr/share/nginx/html/ && \
    rmdir /usr/share/nginx/html/browser; \
    fi

EXPOSE 4300
