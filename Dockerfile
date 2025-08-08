FROM node:18-alpine

WORKDIR /app

# Установка зависимостей для сборки
RUN apk add --no-cache python3 make g++ bash

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Создаем директорию dist если её нет
RUN mkdir -p dist

# Собираем приложение
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]