# Документация API в формате OpenAPI
http://localhost:3000/spec-yaml

# Запуск проекта
```bash
# перейти в папку с проектом
cd ~/fit-friends
#my win
#D:
#cd HTMLAcademy/fit-friends

# Скопировать .env-example -> .env:
cd backend/apps
cp account/.env-example account/.env
cp api/.env-example api/.env
cp file-storage/.env-example file-storage/.env
cp notify/.env-example notify/.env
cd ../../frontend
cp frontend/.env-example frontend/.env

# добавить docker-compose
cd ..
docker compose --file docker-compose.dev.yml up -d

# установка зависимостей для backend
cd backend
npm install

# сформировать PrismaClient
npx nx run fit:db:generate

# инициализировать БД postgres
npx nx run fit:db:migrate

# наполнение тестовыми данными
#npx nx run account:db:seed
#npx nx run fit:db:seed

# запуск сервисов backend
# file-storage
cd backend
npx nx run file-storage:serve
# notify
cd backend
npx nx run notify:serve
# account
cd backend
npx nx run account:serve
# fit
#cd backend
#npx nx run fit:serve
# api
cd backend
npx nx run api:serve

# установка зависимостей для frontend
cd frontend
npm install

# запуск frontend
npm run start
```

# Сценарии
## backend
note: `cd ./backend`

## frontend
note: `cd ./frontend`

