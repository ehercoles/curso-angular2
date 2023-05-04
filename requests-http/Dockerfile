FROM node:latest as angular
WORKDIR /app
COPY package.json /app/
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/requests-http /usr/share/nginx/html
COPY ./config/nginx.conf /etc/ngix/conf.d/default.conf

# Construir imagem
# docker build -t curso-angular2 .

# Executar imagem
# docker run -p 8081:80 curso-angular2
