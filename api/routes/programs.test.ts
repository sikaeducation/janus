import supertest from "supertest";
import fs from "fs-extra";
import app from "./app";

jest.mock("fs-extra");
const mockReadDirectory = fs.readdir as unknown as jest.Mock;

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
