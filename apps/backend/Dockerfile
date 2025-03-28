FROM node:18-alpine
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копируем код
COPY . .

# Сборка и запуск
RUN yarn build
CMD ["yarn", "start"]