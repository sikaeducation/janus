import { Model } from "objection";
import database from "../database-connection";

Model.knex(database);

export default class Performance extends Model {
  static tableName = "performance";

  id!: number;

  createdAt!: number;

  updatedAt!: number;

  userId!: string;

  postSlug!: string;

  payload!: Record<string, unknown>;

  type!: string;
}
