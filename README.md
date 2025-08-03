# 🚀 NestJS User API

Проект для управления пользователями с авторизацией.

## 📌 Возможности
- Регистрация (`POST /auth/register`)
- Вход (`POST /auth/login`)
- Получение профиля (`GET /profile/my`)
- Удаление (`DELETE /users/:id`)

## 🛠 Установка
1. Склонируй репозиторий:
   ```bash
   git clone https://github.com/твой_логин/nest-user-service.git
   ```
2. Установи зависимости:
   ```bash
   npm install
   ```
3. Запусти PostgreSQL:
   ```bash
   docker-compose up -d
   ```
4. Запусти сервер:
   ```bash
   npm run start:dev
   ```

## 📄 Документация API
Смотри [API_DOCS.md](API_DOCS.md)