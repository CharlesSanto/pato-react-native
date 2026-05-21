#!/bin/sh

echo "Waiting for postgres..."

until pg_isready -h postgres -p 5432 -U app_user
do
  sleep 2
done

echo "Postgres is ready"

npx drizzle-kit generate
npx drizzle-kit migrate

npm run dev