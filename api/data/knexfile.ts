import { Knex } from "knex";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST,
      port: 5432,
      user: "postgres",
      database: "postgres",
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

export default config;
