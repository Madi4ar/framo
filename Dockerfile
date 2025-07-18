# Используем официальный образ Node.js
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копируем только необходимые файлы для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# ARG BACKEND_APP_URL
# ENV BACKEND_APP_URL=https://backend.framo.ai/api/
ENV NODE_ENV=production

# Собираем проект
RUN npm run build

# Указываем порт
EXPOSE 3000

# Запускаем продакшн сервер
# CMD ["npm", "start"]
