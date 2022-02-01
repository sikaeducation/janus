import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("performance", (table) => {
    table.string("type");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("performance", (table) => {
    table.dropColumn("type");
  });
}
