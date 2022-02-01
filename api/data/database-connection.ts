/* eslint @typescript-eslint/no-namespace: "off" */
import knex from "knex";
import config from "./knexfile";

const environmentConfig = config[process.env.NODE_ENV || "development"];
export default knex(environmentConfig);
