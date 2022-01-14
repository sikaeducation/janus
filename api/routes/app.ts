import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import getPosts from "../services/github";

import {
  checkProgram,
  readProgram,
  getProgramVersion,
  createProgram,
} from "../services/program";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.get("/", (request: Request, response: Response) => {
  response.status(200).json();
});

app.get(
  "/programs/:programId/current-version",
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

app.get(
  "/programs/:programId",
  async (request: Request, response: Response) => {
    const { programId } = request.params;
    const programExists = await checkProgram(+programId);

    const program = programExists
      ? await readProgram(+programId)
      : await createProgram(+programId);

    response.json({ program });
  }
);

// eslint-disable-next-line
app.get("/error", (request: Request, response: Response) => {
  throw new Error();
});

app.use(
  // eslint-disable-next-line
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // eslint-disable-next-line
    console.error(error.message);
    response.status(500).json({
      error: "There was a problem with this request",
    });
  }
);

export default app;
