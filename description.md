# Документация API в формате OpenAPI
http://localhost:3000/spec-yaml

# Запуск проекта
```bash
# перейти в папку с проектом
cd ~/fit-friends
#my win
#D:
#cd HTMLAcademy/fit-friends
#cd Projects/fit-friends

# Скопировать .env-example -> .env:
cd backend/apps
cp file-storage/.env-example file-storage/.env
cp notify/.env-example notify/.env
cp account/.env-example account/.env
cp fit/.env-example fit/.env
cp api/.env-example api/.env
cp seed/.env-example seed/.env
cd ../../frontend
cp .env-example .env
cd ..

# добавить docker-compose
cd backend
docker compose --file ./apps/file-storage/docker-compose.dev.yml --env-file ./apps/file-storage/docker-compose.dev.env up -d
docker compose --file ./apps/notify/docker-compose.dev.yml --env-file ./apps/notify/docker-compose.dev.env up -d
docker compose --file ./apps/account/docker-compose.dev.yml --env-file ./apps/account/docker-compose.dev.env up -d
docker compose --file ./apps/fit/docker-compose.dev.yml --env-file ./apps/fit/docker-compose.dev.env up -d

# установка зависимостей для backend
cd backend
npm install

# сформировать PrismaClient
npx nx run fit:db:generate

# инициализировать БД postgres
npx nx run fit:db:migrate

# наполнение тестовыми данными
npx nx run seed:build
node --env-file=./apps/seed/.env ./dist/apps/seed/main.js

# запуск сервисов backend
npm run serve

# установка зависимостей для frontend
cd ..
cd frontend
npm install

# запуск frontend
npm run start
```

# Сценарии
## backend
```bash
cd backend

npm run lint
npm run serve
npm run build

npx nx run file-storage:serve
npx nx run file-storage:build

npx nx run notify:serve
npx nx run notify:build

npx nx run account:serve
npx nx run account:build

npx nx run fit:serve
npx nx run fit:build
npx nx run fit:db:generate
npx nx run fit:db:migrate
npx nx run fit:db:lint
npx nx run fit:db:reset

npx nx run api:serve
npx nx run api:build

npx nx run seed:serve
npx nx run seed:build

```

## frontend
```bash
cd frontend

npm run start
npm run build
npm run lint
```
