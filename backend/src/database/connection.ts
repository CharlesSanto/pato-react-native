import postgres from "postgres";

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const name = process.env.DB_NAME;

const connectionString = `postgresql://${user}:${password}@postgres:5432/${name}`

export const sql = postgres(connectionString);