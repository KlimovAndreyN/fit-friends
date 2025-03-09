# Документация API в формате OpenAPI
http://localhost:3000/spec-yaml

# Запуск проекта
```bash
# перейти в папку с проектом
cd ~/fit-friends

# добавить docker-compose
docker compose --file docker-compose.dev.yml up -d

# перейти в папку с проектом
cd ~/fit-friends/backend

# установить зависимости
npm install

# Скопировать .env-example -> .env:
cp apps/account/.env-example apps/account/.env
cp apps/api/.env-example apps/api/.env
cp apps/file-storage/.env-example apps/file-storage/.env
cp apps/notify/.env-example apps/notify/.env

# сформировать PrismaClient
npx nx run fit:db:generate

# инициализировать БД postgres
npx nx run fit:db:migrate

# наполнение тестовыми данными
npx nx run account:db:seed
npx nx run fit:db:seed

# запуск сервисов
npx nx run file-storage:serve
npx nx run fit:serve
npx nx run api:serve

# перейти в папку с проектом
cd ~/fit-friends/frontend

# установить зависимости
npm install

# запуск Web
npm run start
```

# Сценарии
## backend
note: `cd ./backend`

## frontend
note: `cd ./frontend`

