import supertest from "supertest";
import fs from "fs-extra";
import app from "./app";

jest.mock("fs-extra");
const mockReadDirectory = fs.readdir as unknown as jest.Mock;

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

test("GET /programs/:programId/current-version", async () => {
  mockReadDirectory.mockResolvedValueOnce(["123456789"]);

  await supertest(app)
    .get("/programs/1/current-version")
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({ version: "123456789" });
    });
});

test("GET /programs/:programId/current-version", async () => {
  mockReadDirectory.mockResolvedValueOnce([]);

  await supertest(app)
    .get("/programs/1/current-version")
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({});
    });
});

test.skip("GET /programs/:programId", async () => {
  // eslint-disable-next-line
  console.log("Skipping");
});
