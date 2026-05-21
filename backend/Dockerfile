FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x /app/start.sh

EXPOSE 3000

CMD ["sh", "/app/start.sh"]