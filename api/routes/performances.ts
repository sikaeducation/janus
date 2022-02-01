/* eslint-disable @typescript-eslint/no-explicit-any */
import Performance from "../data/models/Performance";

const postPerformance =
  (socket: any, io: any) => (performance: rawPerformance) => {
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
        }
        socket.emit("new-performance", postedPerformance);
      });
  };
const listPerformances = (socket: any) => () => {
  Performance.query()
    .select()
    .where((builder) => {
      // eslint-disable-next-line
      socket.role !== "coach" && builder.where("userId", socket.email);
    })
    .then((performances) => {
      socket.emit("list-performances", performances);
    });
};

const performanceHandlers =
  (io: any) =>
  (socket: any): void => {
    socket.on("list-performances", listPerformances(socket));
    socket.on("post-performance", postPerformance(socket, io));
  };
export default performanceHandlers;
