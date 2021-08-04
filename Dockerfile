FROM node:16

COPY . /mnt/api/

WORKDIR /mnt/api/

RUN npm init -y && npm install && npm build

CMD node dist/index.js