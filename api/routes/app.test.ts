import supertest from "supertest";
import app from "./app";

test("GET /", async () => {
  await supertest(app).get("/").expect(200);
});

test("404 Handler", async () => {
  await supertest(app)
    .get("/doesnt-exist")
    .then((response) => {
      expect(response.statusCode).toBe(404);
    });
});

test("Error Handler", async () => {
  // eslint-disable-next-line
  jest.spyOn(console, "error").mockImplementation(() => {});
  await supertest(app)
    .get("/error")
    .then((response) => {
      expect(response.statusCode).toBe(500);
    });
});
