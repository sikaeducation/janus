import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import getPosts from "../services/github";

import {
  checkProgram,
  readProgram,
  getProgramVersion,
  doEverything as createProgram,
} from "../services/program";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.get("/", (request: Request, response: Response) => {
  response.status(200).json();
});

app.get(
  "/programs/:programId/currentVersion",
  async (request: Request, response: Response) => {
    const { programId } = request.params;
    const version = await getProgramVersion(+programId);
    response.json({ version });
  }
);

app.get(
  "/programs/:programId",
  async (request: Request, response: Response) => {
    const { programId } = request.params;
    const programExists = await checkProgram(+programId);
    if (!programExists) {
      await createProgram(+programId);
    }
    const program = await readProgram(+programId);
    response.json(program);
  }
);

app.get("/topics", (request: Request, response: Response) => {
  getPosts().then(() => {
    response.json({ message: "files done" });
  });
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
