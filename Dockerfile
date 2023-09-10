FROM node:17
WORKDIR /usr/src/app


COPY . . 

RUN npm install --force

RUN ls /usr/src/app


EXPOSE 3000

ENTRYPOINT npm run start

