import { Server, Socket } from "socket.io";
import { difference } from "lodash/fp";
import Performance from "../data/models/Performance";
import Evaluation from "../data/models/Evaluation";

type SikaSocket = Socket & { email?: string; role?: string };

const postPerformance =
  (socket: SikaSocket, io: Server) => async (performance: rawPerformance) => {
    if (["submission", "question"].includes(performance.type)) {
      // Get all performances with this user and post slug
      const performances = await Performance.query().select("id").where({
        userId: performance.userId,
        postSlug: performance.postSlug,
      });
      const allPerformanceIds = performances.map((record) => record.id);
      // // Get all evaluations for those performances
      const evaluations = await Evaluation.query()
        .select("performanceId")
        .whereIn("performanceId", allPerformanceIds);
      const performanceIdsWithEvaluations = evaluations.map(
        (evaluation) => evaluation.performanceId
      );
      const performanceIdsWithoutEvaluations = difference(allPerformanceIds)(
        performanceIdsWithEvaluations
      );
      // // For any performance without evaluations, add a "deferred" one
      const deferredEvaluations = performanceIdsWithoutEvaluations.map((id) => {
        return {
          performanceId: id,
          feedback:
            "Another performance was submitted before this was evaluated",
          evaluatorId: "admin@sikaeducation.com",
          learnerId: performance.userId,
          status: "deferred",
        };
      });
      if (deferredEvaluations.length) {
        const savedEvaluations = await Evaluation.query()
          .returning("*")
          .insert(deferredEvaluations);
        savedEvaluations.forEach((evaluation) => {
          io.to("coaches").emit("new-evaluation", evaluation);
          io.to(evaluation.learnerId).emit("new-evaluation", evaluation);
          io.to(evaluation.learnerId).emit("new-evaluation-notice", evaluation);
        });
      }
    }
    // Then add the performance
    return Performance.query()
      .returning("*")
      .insert({
        userId: socket.email,
        postSlug: performance.postSlug,
        type: performance.type,
        payload: performance.payload,
      })
      .then((postedPerformance) => {
        if (socket.role !== "coach") {
          socket.emit("new-performance", postedPerformance);
        }
        io.to("coaches").emit("new-performance-notice", postedPerformance);
        io.to("coaches").emit("new-performance", postedPerformance);
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
        if (socket.role !== "coach") {
          io.to(evaluation.learnerId).emit("new-evaluation", postedEvaluation);
          io.to(evaluation.learnerId).emit(
            "new-evaluation-notice",
            postedEvaluation
          );
        }
      });
  };
const cutoff = "2022-05-01"; // Temporary, speeds up grading
const listPerformances = (socket: SikaSocket) => () => {
  Performance.query()
    .select()
    .where((builder) => {
      // eslint-disable-next-line
      socket.role === "coach" && builder.where("createdAt", ">", cutoff);
    })
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
