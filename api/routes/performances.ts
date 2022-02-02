/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server, Socket } from "socket.io";
import Performance from "../data/models/Performance";

type SikaSocket = Socket & { email?: string; role?: string };

const postPerformance =
  (socket: SikaSocket, io: Server) => (performance: rawPerformance) => {
    return Performance.query()
      .returning("*")
      .insert({
        userId: socket.email,
        postSlug: performance.postSlug,
        type: performance.type,
        payload: performance.payload,
      })
      .then((postedPerformance) => {
        if (socket.role === "coach") {
          io.to("coaches").emit("new-performance-notice", postedPerformance);
          io.to("coaches").emit("new-performance", postedPerformance);
        } else {
          socket.emit("new-performance", postedPerformance);
        }
      });
  };
const listPerformances = (socket: SikaSocket) => () => {
  Performance.query()
    .select()
    .where((builder) => {
      // eslint-disable-next-line
      socket.role !== "coach" && builder.where("userId", socket?.email || "");
    })
    .then((performances) => {
      socket.emit("list-performances", performances);
    });
};

const performanceHandlers =
  (io: Server) =>
  (socket: SikaSocket): void => {
    socket.on("list-performances", listPerformances(socket));
    socket.on("post-performance", postPerformance(socket, io));
  };
export default performanceHandlers;
