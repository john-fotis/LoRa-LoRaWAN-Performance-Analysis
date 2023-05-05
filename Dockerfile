FROM node:19
ARG node_env=production
ARG port=3000
ENV NODE_ENV=${node_env}
EXPOSE ${port}
WORKDIR /home/node/app
RUN npm install -g npm@9.6.0
ENTRYPOINT [ "npm" ]
CMD [ "start" ]