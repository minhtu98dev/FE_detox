FROM nginx

# Cài đặt git
RUN apt-get update && apt-get install -y git

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY build/ .