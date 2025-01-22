FROM node:22
COPY ./deploy/entrypoint.sh ./entrypoint.sh
COPY ./dist /app
RUN chmod +x ./entrypoint.sh
EXPOSE 8080/tcp
ENTRYPOINT ["./entrypoint.sh"]