import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import sampleData from "../data/sample_program";

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

export default app;
