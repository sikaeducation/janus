import { Server } from "socket.io";

export default function activitySocketHandlers(io: Server) {
  io.on("connection", (socket: any) => {
    socket.on("post-activity", (activity: activity) => {
      console.log("slug", activity.postSlug, "userId", socket.email);
      const postedActivity = activity; // Add activity
      // io.of("coaches").emit(postedActivity);
      socket.emit("new-activity", postedActivity);
    });
  });
}
