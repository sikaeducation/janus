import { Knex } from "knex";

const config: Record<string, Knex.Config> = {
  development: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
  },
  production: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
  },
};

export default config;
