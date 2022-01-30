import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

import { createServer } from "http";
import { Server } from "socket.io";
import programs from "./programs";
import activitySocketHandlers from "./activities";

dotenv.config();

const app = express();

app.use(cors());
if (app.get("env") !== "test") app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.json());

export const socketServer = createServer(app);
const io = new Server(socketServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
});

io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  const { verify } = jwt;
  const secretUrl = "https://dev-6vs4dnoj.us.auth0.com/.well-known/jwks.json";

  const client = jwksClient({
    jwksUri: secretUrl,
  });

  const getKey = (
    header: any,
    callback: (error: Error | null, signingKey: string) => void
  ) => {
    client.getSigningKey(header.kid, (error, key) => {
      const signingKey = key.getPublicKey();
      callback(error, signingKey);
    });
  };

  verify(token, getKey, (error, decodedJwt: any) => {
    // eslint-disable-next-line
    (socket as any).email = decodedJwt["https://sikaeducation.com/email"];
    next(error as Error | undefined);
  });
});
activitySocketHandlers(io);

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
