FROM node:20
ARG port=3000
EXPOSE ${port}
WORKDIR /home/node/app
COPY public ./public
COPY package*.json .
COPY src ./src
RUN npm install
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh
ENTRYPOINT [ "bash" ]
CMD [ "-c", "./entrypoint.sh" ]