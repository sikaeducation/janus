import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import sampleData from "../data/sample_program";
import getTopics from "../services/github";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.get("/", (request: Request, response: Response) => {
  response.status(200).json();
});

app.get("/programs/:programId", (request: Request, response: Response) => {
  response.json({ program: sampleData });
});

app.get("/topics", (request: Request, response: Response) => {
  getTopics().then(() => {
    response.json({ message: "files done" });
  });
});

export default app;
