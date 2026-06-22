# Etapa de construcción
FROM node:20 as build

WORKDIR /app
COPY . .
# RUN npm install -g npm@latest
RUN npm install --force

RUN npm run build-alt

# Etapa de nginx
FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]