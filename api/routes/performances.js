"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const Performance_1 = __importDefault(require("../data/models/Performance"));
const Evaluation_1 = __importDefault(require("../data/models/Evaluation"));
const postPerformance = (socket, io) => (performance) => __awaiter(void 0, void 0, void 0, function* () {
    if (["submission", "question"].includes(performance.type)) {
        // Get all performances with this user and post slug
        const performances = yield Performance_1.default.query().select("id").where({
            userId: performance.userId,
            postSlug: performance.postSlug,
        });
        const allPerformanceIds = performances.map((record) => record.id);
        // // Get all evaluations for those performances
        const evaluations = yield Evaluation_1.default.query()
            .select("performanceId")
            .whereIn("performanceId", allPerformanceIds);
        const performanceIdsWithEvaluations = evaluations.map((evaluation) => evaluation.performanceId);
        const performanceIdsWithoutEvaluations = (0, fp_1.difference)(allPerformanceIds)(performanceIdsWithEvaluations);
        // // For any performance without evaluations, add a "deferred" one
        const deferredEvaluations = performanceIdsWithoutEvaluations.map((id) => {
            return {
                performanceId: id,
                feedback: "Another performance was submitted before this was evaluated",
                evaluatorId: "admin@sikaeducation.com",
                learnerId: performance.userId,
                status: "deferred",
            };
        });
        if (deferredEvaluations.length) {
            const savedEvaluations = yield Evaluation_1.default.query()
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
    return Performance_1.default.query()
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
});
const postEvaluation = (socket, io) => (evaluation) => {
    return Evaluation_1.default.query()
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
            io.to(evaluation.learnerId).emit("new-evaluation-notice", postedEvaluation);
        }
    });
};
const cutoff = "2022-05-01"; // Temporary, speeds up grading
const listPerformances = (socket) => () => {
    Performance_1.default.query()
        .select()
        .where((builder) => {
        // eslint-disable-next-line
        socket.role === "coach" && builder.where("createdAt", ">", cutoff);
    })
        .where((builder) => {
        // eslint-disable-next-line
        socket.role !== "coach" && builder.where("userId", (socket === null || socket === void 0 ? void 0 : socket.email) || "");
    })
        .then((performances) => {
        socket.emit("list-performances", performances);
    });
};
const listEvaluations = (socket) => () => {
    Evaluation_1.default.query()
        .select()
        .where((builder) => {
        // eslint-disable-next-line
        socket.role !== "coach" && builder.where("learnerId", (socket === null || socket === void 0 ? void 0 : socket.email) || "");
    })
        .then((evaluations) => {
        socket.emit("list-evaluations", evaluations);
    });
};
const performanceHandlers = (io) => (socket) => {
    socket.on("list-performances", listPerformances(socket));
    socket.on("list-evaluations", listEvaluations(socket));
    socket.on("post-performance", postPerformance(socket, io));
    socket.on("post-evaluation", postEvaluation(socket, io));
};
exports.default = performanceHandlers;
//# sourceMappingURL=performances.js.map