import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import programs from "./programs";

dotenv.config();

const app = express();

app.use(cors());
if (app.get("env") !== "test") app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.json());

app.use("/programs", programs);

app.get("/", (request: Request, response: Response) => {
  response.status(200).json();
});

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
