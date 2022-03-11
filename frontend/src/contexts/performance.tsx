import { useState, createContext, useContext, useEffect } from "react";
import {
  filter,
  flow,
  groupBy,
  head,
  isEmpty,
  map,
  mapValues,
  maxBy,
  reverse,
  sortBy,
} from "lodash/fp";
import { format } from "date-fns";
import useSocketHandlers from "../hooks/use-socket-handlers";
import { toastContext } from "./toast";
import { SocketContext } from "./socket";

const onlyQuestions = filter(
  (performance: evaluatedPerformance) => performance.type === "question"
);
const addPostSlugToQuestionPayload = map(
  (performance: evaluatedQuestionPerformance) => ({
    ...performance,
    originalPostSlug: performance.payload.originalPostSlug,
  })
);
const lastPerformanceBySlugByQuestion = mapValues(
  maxBy((performance: postedPerformance) => {
    return Date.parse(performance.createdAt);
  })
);
const groupByPost = groupBy("postSlug");
const groupByLearner = groupBy("userId");
const groupByQuestion = groupBy("originalPostSlug");

type performanceContext = {
  learners: string[];
  lastQuestionPerformancesBySlug: Record<
    string,
    Record<string, evaluatedQuestionPerformance>
  >;
  lastQuestionPerformancesBySlugByLearnerByQuestion: Record<
    string,
    Record<string, Record<string, evaluatedQuestionPerformance>>
  >;
  postPerformance: (performance: rawPerformance) => void;
  postEvaluation: (evaluation: rawEvaluation) => void;
  performances: evaluatedPerformance[];
  performancesWithEvaluations: evaluatedPerformance[];
  performancesByDay: Record<string, evaluatedSubmissionPerformance[]>;
  evaluations: postedEvaluation[];
  getPreviousEvaluations: (
    performance: evaluatedPerformance
  ) => evaluatedSubmissionPerformance[];
  lastPerformanceBySlugByLearner: Record<
    string,
    Record<string, evaluatedPerformance>
  >;
  performancesBySlugByLearner: Record<
    string,
    Record<string, evaluatedPerformance[]>
  >;
  unevaluatedQuestionPerformancesBySlugByLearner: Record<
    string,
    Record<string, evaluatedQuestionPerformance[]>
  >;
};
export const performanceContext = createContext<performanceContext>(
  {} as performanceContext
);

type props = {
  children: JSX.Element;
};

export function PerformanceProvider({ children }: props) {
  const [performances, setPerformances] = useState<
    evaluatedSubmissionPerformance[]
  >([]);
  const [evaluations, setEvaluations] = useState<postedEvaluation[]>([]);
  const socket = useContext(SocketContext);
  const { toasts, setToasts } = useContext(toastContext);

  useSocketHandlers({
    "list-performances": (
      retrievedPerformances: evaluatedSubmissionPerformance[]
    ) => setPerformances(retrievedPerformances),
    "list-evaluations": (retrievedEvaluations: postedEvaluation[]) =>
      setEvaluations(retrievedEvaluations),
    "new-performance": (performance: evaluatedSubmissionPerformance) =>
      setPerformances((previous) => [...previous, performance]),
    "new-performance-notice": (performance: postedPerformance) =>
      setToasts([...toasts, performance.userId]),
    "new-evaluation": (evaluation: postedEvaluation) =>
      setEvaluations((previous) => [...previous, evaluation]),
    "new-evaluation-notice": (evaluation: postedEvaluation) =>
      setToasts([...toasts, evaluation.status]),
  });

  useEffect(() => {
    socket.emit("list-performances");
    socket.emit("list-evaluations");
    // eslint-disable-next-line
  }, []);

  const postPerformance = (performance: rawPerformance) => {
    return socket.emit("post-performance", performance);
  };
  const postEvaluation = (evaluation: rawEvaluation) => {
    return socket.emit("post-evaluation", evaluation);
  };
  const performancesWithEvaluations = performances.map((performance) => {
    return {
      ...performance,
      ...{
        evaluation: evaluations.find(
          (evaluation) => evaluation.performanceId === performance.id
        ),
      },
    };
  });
  const performancesByDay = groupBy(
    (performance: evaluatedSubmissionPerformance) => {
      return format(new Date(performance.createdAt), "yyyy/MM/dd");
    }
  )(performancesWithEvaluations);

  function getPreviousEvaluations(performance: evaluatedPerformance) {
    return performancesWithEvaluations.filter((evaluatedPerformance) => {
      return (
        evaluatedPerformance.userId === performance.userId &&
        evaluatedPerformance.postSlug === performance.postSlug &&
        evaluatedPerformance.id !== performance.id
      );
    });
  }

  const learners = Array.from(
    new Set(performances.map((performance) => performance.userId))
  );

  const lastPerformanceBySlugByLearner = flow([
    groupBy("postSlug"),
    mapValues(sortBy("createdAt")),
    mapValues(reverse),
    mapValues(flow([groupBy("userId"), mapValues(head)])),
  ])(performancesWithEvaluations);

  const performancesBySlugByLearner = flow([
    groupBy("postSlug"),
    mapValues(sortBy("createdAt")),
    mapValues(reverse),
    mapValues(groupBy("userId")),
  ])(performancesWithEvaluations);

  const unevaluatedQuestionPerformancesBySlugByLearner = flow([
    filter((performance: evaluatedSubmissionPerformance) =>
      isEmpty(performance.evaluation)
    ),
    filter(
      (performance: evaluatedQuestionPerformance) =>
        performance.type === "question"
    ),
    groupBy("postSlug"),
    maxBy("length"),
    mapValues(sortBy("createdAt")),
    mapValues(reverse),
    mapValues(groupBy("userId")),
  ])(performancesWithEvaluations);

  const lastQuestionPerformancesBySlug = flow([
    filter(
      (performance: evaluatedPerformance) => performance.type === "question"
    ),
    map((performance: evaluatedQuestionPerformance) => ({
      ...performance,
      originalPostSlug: performance.payload.originalPostSlug,
    })),
    groupBy("originalPostSlug"),
    mapValues(groupBy("postSlug")),
    mapValues(
      mapValues(
        maxBy((performance: postedPerformance) => {
          return Date.parse(performance.createdAt);
        })
      )
    ),
  ])(performancesWithEvaluations);

  const lastQuestionPerformancesBySlugByLearnerByQuestion = flow([
    onlyQuestions,
    addPostSlugToQuestionPayload,
    groupByQuestion,
    mapValues(
      flow([
        groupByLearner,
        mapValues(flow([groupByPost, lastPerformanceBySlugByQuestion])),
      ])
    ),
  ])(performancesWithEvaluations);

  return (
    <performanceContext.Provider
      value={{
        lastQuestionPerformancesBySlug,
        lastQuestionPerformancesBySlugByLearnerByQuestion,
        performancesBySlugByLearner,
        learners,
        performances,
        performancesWithEvaluations,
        unevaluatedQuestionPerformancesBySlugByLearner,
        performancesByDay,
        lastPerformanceBySlugByLearner,
        postPerformance,
        postEvaluation,
        getPreviousEvaluations,
        evaluations,
      }}
    >
      {children}
    </performanceContext.Provider>
  );
}
