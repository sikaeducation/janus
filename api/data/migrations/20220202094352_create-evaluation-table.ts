import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("evaluation", (table) => {
    table.increments();
    table.timestamps(false, true, true);
    table.text("feedback");
    table.string("status");
    table.string("learnerId");
    table.string("evaluatorId");
    table.integer("performanceId").references("id").inTable("performance");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("evaluation");
}
