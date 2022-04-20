"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint @typescript-eslint/no-namespace: "off" */
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const environmentConfig = knexfile_1.default[process.env.NODE_ENV || "development"];
exports.default = (0, knex_1.default)(environmentConfig);
//# sourceMappingURL=database-connection.js.map