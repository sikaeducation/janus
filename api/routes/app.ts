import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";

import { createServer } from "http";
import programs from "./programs";
import socketAuth from "../services/socket-auth";
import performanceHandlers from "./performances";
import promptHandlers from "./prompts";

type SikaSocket = Socket & { email?: string; role?: string };

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
io.use(socketAuth);
io.on("connection", (socket: SikaSocket) => {
  if (socket.role === "coach") {
    socket.join("coaches");
  }
  socket.join(socket.email || "");
});
io.on("connection", performanceHandlers(io));
io.on("connection", promptHandlers(io));

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
