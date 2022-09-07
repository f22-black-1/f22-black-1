FROM node:14 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:14-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 8080

CMD [ "npm", "start"]