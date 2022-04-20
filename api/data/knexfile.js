"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
//# sourceMappingURL=knexfile.js.map