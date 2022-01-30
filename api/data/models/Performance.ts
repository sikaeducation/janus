import { Model } from "objection";
import database from "../database-connection";

Model.knex(database);

export default class Performance extends Model {
  static tableName = "performance";
}
