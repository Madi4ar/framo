# 1. Указываем базовый образ
FROM node:18-alpine

# 2. Рабочая директория внутри контейнера
WORKDIR /app

# 3. Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# 4. Копируем остальной проект
COPY . .

# 5. Указываем порт
EXPOSE 3000

# 6. Команда запуска
CMD ["npm", "run", "dev", "--", "--turbo=false"]

