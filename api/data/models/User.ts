import { Model } from "objection";
import database from "../database-connection";

Model.knex(database);

export default class User extends Model {
  static tableName = "user";

  id!: number;
}
