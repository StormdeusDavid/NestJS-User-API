FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Копируем остальные файлы
COPY . .

# Устанавливаем переменные окружения для сборки
ARG DB_HOST=postgres
ARG DB_PORT=5432
ARG DB_USERNAME=postgres
ARG DB_PASSWORD=postgres
ARG DB_DATABASE=nest_db
ENV DB_HOST=$DB_HOST \
    DB_PORT=$DB_PORT \
    DB_USERNAME=$DB_USERNAME \
    DB_PASSWORD=$DB_PASSWORD \
    DB_DATABASE=$DB_DATABASE

RUN npm run build

CMD ["npm", "run", "start:prod"]