import { Server } from "socket.io";

export default function activitySocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    socket.on("post-activity", (activity) => {
      const postedActivity = activity; // Add activity
      io.of("coaches").emit(postedActivity);
      socket.emit("new-activity", postedActivity);
    });
  });
}
