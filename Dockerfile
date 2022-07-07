FROM node:latest

WORKDIR /app

RUN apt-get update

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm","start"]
