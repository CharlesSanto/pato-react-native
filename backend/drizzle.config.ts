import { defineConfig } from 'drizzle-kit'

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const name = process.env.DB_NAME;

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/database/schema.ts',
    dbCredentials: {
        url: `postgresql://${user}:${password}@postgres:5432/${name}`
    }
})