/* eslint-disable @typescript-eslint/no-explicit-any */
import Performance from "../data/models/Performance";

const postPerformance = (socket: any) => (performance: performance) => {
  return Performance.query()
    .returning("*")
    .insert({
      userId: socket.email,
      postSlug: performance.postSlug,
      payload: performance.payload,
    })
    .then((postedPerformance) => {
      socket.emit("new-performance", postedPerformance);
    });
};
const listPerformances = (socket: any) => {
  return Performance.query()
    .select()
    .where("userId", socket.email)
    .then((performances) => {
      socket.emit("list-performances", performances);
    });
};

export default function activityHandlers(socket: any): void {
  socket.on("list-performances", listPerformances(socket));
  socket.on("post-performance", postPerformance(socket));
}
