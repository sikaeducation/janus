import { Model } from "objection";
import database from "../database-connection";

Model.knex(database);

export default class Evaluation extends Model {
  static tableName = "evaluation";

  id!: number;

  createdAt!: number;

  updatedAt!: number;

  feedback!: string;

  status!: string;

  learnerId!: string;

  evaluatorId!: string;

  performanceId!: number;
}
