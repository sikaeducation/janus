import supertest from "supertest";
import fs from "fs-extra";
import app from "./app";
import {
  buildAllPrograms,
  getProgramVersion,
  checkProgram,
} from "../services/program";
import { verifyWebHook } from "../services/github";

jest.mock("fs-extra");
jest.mock("../services/program");
jest.mock("../services/github");

jest.spyOn(console, "log").mockImplementation(() => true);

const mockReadDirectory = fs.readdir as unknown as jest.Mock;
const mockBuildAllPrograms = buildAllPrograms as unknown as jest.Mock;
const mockVerifyWebhook = verifyWebHook as unknown as jest.Mock;
const mockGetProgramVersion = getProgramVersion as unknown as jest.Mock;
const mockCheckProgram = checkProgram as unknown as jest.Mock;

test("GET /programs/:programId/current-version returns a version if present", async () => {
  mockGetProgramVersion.mockResolvedValueOnce("123456789");

  await supertest(app)
    .get("/programs/1/current-version")
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({ version: "123456789" });
    });
});

test("GET /programs/:programId/current-version returns nothing if no version present", async () => {
  mockGetProgramVersion.mockResolvedValueOnce("");

  await supertest(app)
    .get("/programs/1/current-version")
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({ version: "" });
    });
});

test("POST /programs/build succeeds", async () => {
  mockVerifyWebhook.mockReturnValueOnce(true);
  await supertest(app)
    .post("/programs/build")
    .expect(200)
    .then(() => {
      expect(mockVerifyWebhook).toHaveBeenCalled();
      expect(mockBuildAllPrograms).toHaveBeenCalled();
    });
});

test("POST /programs/build fails", async () => {
  mockVerifyWebhook.mockReturnValueOnce(false);
  await supertest(app)
    .post("/programs/build")
    .expect(401)
    .then(() => {
      expect(mockVerifyWebhook).toHaveBeenCalled();
      expect(mockBuildAllPrograms).toHaveBeenCalled();
    });
});
