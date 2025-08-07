FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Указываем переменные окружения для сборки
ENV DB_PORT=5432
ENV DB_HOST=db
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=nestjs_db

RUN npm run build

CMD ["npm", "run", "start:prod"]