FROM node:12.13.1

RUN mkdir /app

ADD . /app

WORKDIR /app

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000