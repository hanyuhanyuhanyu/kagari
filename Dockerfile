FROM nginx
COPY ./dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]