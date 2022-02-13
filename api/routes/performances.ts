import { Server, Socket } from "socket.io";
import Performance from "../data/models/Performance";
import Evaluation from "../data/models/Evaluation";

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
const postEvaluation =
  (socket: SikaSocket, io: Server) => (evaluation: rawEvaluation) => {
    return Evaluation.query()
      .returning("*")
      .insert({
        performanceId: evaluation.performanceId,
        feedback: evaluation.feedback,
        evaluatorId: evaluation.evaluatorId,
        learnerId: evaluation.learnerId,
        status: evaluation.status,
      })
      .then((postedEvaluation) => {
        io.to("coaches").emit("new-evaluation", postedEvaluation);
        io.to(evaluation.learnerId).emit("new-evaluation", postedEvaluation);
        io.to(evaluation.learnerId).emit(
          "new-evaluation-notice",
          postedEvaluation
        );
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
const listEvaluations = (socket: SikaSocket) => () => {
  Evaluation.query()
    .select()
    .where((builder) => {
      // eslint-disable-next-line
      socket.role !== "coach" && builder.where("learnerId", socket?.email || "");
    })
    .then((evaluations) => {
      socket.emit("list-evaluations", evaluations);
    });
};

const performanceHandlers =
  (io: Server) =>
  (socket: SikaSocket): void => {
    socket.on("list-performances", listPerformances(socket));
    socket.on("list-evaluations", listEvaluations(socket));
    socket.on("post-performance", postPerformance(socket, io));
    socket.on("post-evaluation", postEvaluation(socket, io));
  };
export default performanceHandlers;
