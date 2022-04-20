import { useState, createContext, useContext, useEffect } from "react";
import {
  countBy,
  filter,
  flow,
  groupBy,
  head,
  isEmpty,
  map,
  mapValues,
  maxBy,
  reduce,
  reverse,
  sortBy,
  toPairs,
} from "lodash/fp";
import { format } from "date-fns";
import useSocketHandlers from "../hooks/use-socket-handlers";
import { toastContext } from "./toast";
import { SocketContext } from "./socket";

const onlyQuestions = filter(
  (performance: evaluatedPerformance) => performance.type === "question"
);
const onlyUnevaluated = filter((performance: evaluatedSubmissionPerformance) =>
  isEmpty(performance.evaluation)
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

  const sortedPerformancesBySlug = flow([
    groupBy("postSlug"),
    mapValues(sortBy("createdAt")),
    mapValues(reverse),
  ])(performancesWithEvaluations);

  const lastPerformanceBySlugByLearner = flow([
    mapValues(flow([groupBy("userId"), mapValues(head)])),
  ])(sortedPerformancesBySlug);

  const performancesBySlugByLearner = flow([mapValues(groupBy("userId"))])(
    sortedPerformancesBySlug
  );

  const sortByMostFrequent = (
    questionPerformances: evaluatedQuestionPerformance[]
  ) => {
    return flow([
      countBy((performance: evaluatedQuestionPerformance) => {
        return performance.postSlug;
      }),
      toPairs,
      sortBy(1),
      reverse,
      map("0"),
      reduce((group, slug: string) => {
        return {
          ...group,
          [slug]: filter(
            (p: evaluatedQuestionPerformance) => p.postSlug === slug
          )(questionPerformances),
        };
      }, {}),
    ])(questionPerformances);
  };

  const unevaluatedQuestionPerformancesBySlugByLearner = evaluations.length
    ? flow([
        onlyUnevaluated,
        onlyQuestions,
        sortByMostFrequent,
        mapValues(sortBy("createdAt")),
        mapValues(reverse),
        mapValues(groupBy("userId")),
      ])(performancesWithEvaluations)
    : {};

  const performancesByQuestion = flow([
    onlyQuestions,
    addPostSlugToQuestionPayload,
    groupByQuestion,
  ])(performancesWithEvaluations);

  const lastQuestionPerformancesBySlug = flow([
    mapValues(groupBy("postSlug")),
    mapValues(
      mapValues(
        maxBy((performance: postedPerformance) => {
          return Date.parse(performance.createdAt);
        })
      )
    ),
  ])(performancesByQuestion);

  const lastQuestionPerformancesBySlugByLearnerByQuestion = flow([
    mapValues(
      flow([
        groupByLearner,
        mapValues(flow([groupByPost, lastPerformanceBySlugByQuestion])),
      ])
    ),
  ])(performancesByQuestion);

  return (
    <performanceContext.Provider
      value={{
        performances,
        evaluations,
        lastQuestionPerformancesBySlug,
        lastQuestionPerformancesBySlugByLearnerByQuestion,
        performancesBySlugByLearner,
        performancesWithEvaluations,
        unevaluatedQuestionPerformancesBySlugByLearner,
        lastPerformanceBySlugByLearner,
        performancesByDay,
        learners,
        postPerformance,
        postEvaluation,
        getPreviousEvaluations,
      }}
    >
      {children}
    </performanceContext.Provider>
  );
}
