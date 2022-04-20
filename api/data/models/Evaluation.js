"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const database_connection_1 = __importDefault(require("../database-connection"));
objection_1.Model.knex(database_connection_1.default);
class Evaluation extends objection_1.Model {
}
exports.default = Evaluation;
Evaluation.tableName = "evaluation";
//# sourceMappingURL=Evaluation.js.map