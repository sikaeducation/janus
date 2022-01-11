import supertest from "supertest";
import app from "./app";
import sampleData from "./data/sample_program";

test("GET /", async () => {
  await supertest(app).get("/").expect(200);
});

test("GET /programs/:programId", async () => {
  await supertest(app)
    .get("/programs/1")
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({ program: sampleData });
      expect(response.headers).toHaveProperty("access-control-allow-origin");
    });
});
