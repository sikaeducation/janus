import { Knex } from "knex";

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  await knex("evaluation").del();
  await knex("performance").del();
  await knex("performance").insert([
    {
      type: "view",
      userId: "kyle.coberly@gmail.com",
      postSlug: "cli-intro",
      payload: {
        confidenceLevel: 2,
      },
    },
    {
      type: "submission",
      userId: "kyle.coberly@gmail.com",
      postSlug: "exercise-cli-exercise-1",
      payload: {
        url: "http://google.com",
      },
    },
  ]);
}
