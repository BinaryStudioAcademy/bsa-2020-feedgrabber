FROM nginx:1.16.0-alpine
ADD ./frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY .docker/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]