import supertest from "supertest";
import app from "./app";
import {
  buildAllPrograms,
  getProgramVersion,
  checkProgram,
  readProgram,
  buildProgram,
} from "../services/program";
import { verifyWebHook } from "../services/github";

jest.mock("fs-extra");
jest.mock("../services/program");
jest.mock("../services/github");

const mockBuildAllPrograms = buildAllPrograms as unknown as jest.Mock;
const mockVerifyWebhook = verifyWebHook as unknown as jest.Mock;
const mockGetProgramVersion = getProgramVersion as unknown as jest.Mock;
const mockCheckProgram = checkProgram as unknown as jest.Mock;
const mockReadProgram = readProgram as unknown as jest.Mock;
const mockBuildProgram = buildProgram as unknown as jest.Mock;

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

test("GET /programs/1 reads the program if it exists", async () => {
  mockCheckProgram.mockResolvedValueOnce(true);
  mockReadProgram.mockResolvedValueOnce({ id: 1 });
  await supertest(app)
    .get("/programs/1")
    .expect(200)
    .then((response) => {
      expect(mockCheckProgram).toHaveBeenCalledWith(1);
      expect(mockReadProgram).toHaveBeenCalledWith(1);
      expect(mockBuildProgram).not.toHaveBeenCalled();
      expect(response.body).toEqual({ program: { id: 1 } });
    });
});

test("GET /programs/1 builds the program if it doesn't exists", async () => {
  mockCheckProgram.mockResolvedValueOnce(false);
  mockBuildProgram.mockResolvedValueOnce({ id: 1 });
  await supertest(app)
    .get("/programs/1")
    .expect(200)
    .then((response) => {
      expect(mockCheckProgram).toHaveBeenCalledWith(1);
      expect(mockBuildProgram).toHaveBeenCalled();
      expect(response.body).toEqual({ program: { id: 1 } });
    });
});
