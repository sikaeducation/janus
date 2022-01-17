import express, { Request, Response } from "express";

import {
  checkProgram,
  readProgram,
  getProgramVersion,
  buildProgram,
  buildAllPrograms,
} from "../services/program";
import { verifyWebHook } from "../services/github";

const router = express.Router();

router.get(
  "/:programId/current-version",
  async (request: Request, response: Response) => {
    const { programId } = request.params;
    try {
      const version = await getProgramVersion(+programId);
      response.json({ version });
    } catch {
      response.status(400).json({});
    }
  }
);

router.get("/:programId", async (request: Request, response: Response) => {
  const { programId } = request.params;
  try {
    const programExists = await checkProgram(+programId);

    const program = programExists
      ? await readProgram(+programId)
      : await buildProgram(+programId);

    response.json({ program });
  } catch (error) {
    // eslint-disable-next-line
      if (error instanceof Error) console.error(error.message);
    response
      .status(500)
      .json({ error: "There was an error retrieving this program" });
  }
});

router.post("/build", async (request: Request, response: Response) => {
  const isValid =
    process.env.NODE_ENV !== "production" || verifyWebHook(request);
  if (isValid) {
    await buildAllPrograms();
    response.status(200).send();
  } else {
    response.status(401).send();
  }
});

export default router;