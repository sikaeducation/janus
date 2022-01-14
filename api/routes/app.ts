import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import crypto from "crypto";
import bodyParser from "body-parser";

import {
  checkProgram,
  readProgram,
  getProgramVersion,
  createProgram,
  createPrograms,
} from "../services/program";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.json());

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
    try {
      const programExists = await checkProgram(+programId);

      const program = programExists
        ? await readProgram(+programId)
        : await createProgram(+programId);

      response.json({ program });
    } catch (error) {
      // eslint-disable-next-line
      if (error instanceof Error) console.error(error.message);
      response
        .status(500)
        .json({ error: "There was an error retrieving this program" });
    }
  }
);

function verifyWebHook(request: Request) {
  const GITHUB_WEBHOOK_TOKEN = process.env.GITHUB_WEBHOOK_TOKEN || "";

  const signature = Buffer.from(
    request.get("X-Hub-Signature-256") || "",
    "utf8"
  );
  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_TOKEN);
  const digest = Buffer.from(
    `sha256=${hmac.update(request.body).digest("hex")}`,
    "utf8"
  );

  return crypto.timingSafeEqual(signature, digest);
}

app.post("/build", async (request: Request, response: Response) => {
  const isValid = verifyWebHook(request);
  if (isValid) {
    await createPrograms();
    response.status(200).send();
  } else {
    response.status(401).send();
  }
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
