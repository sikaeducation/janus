import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("performance", (table) => {
    table.increments();
    table.timestamps(false, true, true);
    table.string("userId");
    table.string("postSlug");
    table.jsonb("payload");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("performance");
}
