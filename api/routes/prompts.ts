import { Server, Socket } from "socket.io";

type SikaSocket = Socket & { email?: string; role?: string };

let currentBroadcast: rawBroadcast | null = null;

const startInboxPrompt =
  (socket: SikaSocket, io: Server) => (broadcast: rawBroadcast) => {
    if (socket.role === "coach") {
      // eslint-disable-next-line
      currentBroadcast = broadcast;
      io.emit("new-inbox-prompt", broadcast);
    }
  };
const endInboxPrompt = (socket: SikaSocket, io: Server) => () => {
  if (socket.role === "coach") {
    // eslint-disable-next-line
      currentBroadcast = null;
    io.emit("end-inbox-prompt");
  }
};

const getInboxPrompt = (socket: SikaSocket) => () => {
  socket.emit("new-inbox-prompt", currentBroadcast);
};

const promptHandlers =
  (io: Server) =>
  (socket: SikaSocket): void => {
    socket.on("start-inbox-prompt", startInboxPrompt(socket, io));
    socket.on("end-inbox-prompt", endInboxPrompt(socket, io));
    socket.on("get-inbox-prompt", getInboxPrompt(socket));
  };

export default promptHandlers;
