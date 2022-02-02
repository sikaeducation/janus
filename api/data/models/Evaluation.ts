import { Model } from "objection";
import database from "../database-connection";

Model.knex(database);

export default class Evaluation extends Model {
  static tableName = "evaluation";
}
