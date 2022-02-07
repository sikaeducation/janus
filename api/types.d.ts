type Clobber<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
}
type postType =
  | "root"
  | "unit"
  | "section"
  | "topic"
  | "exercise"
  | "guide"
  | "concept";
type rawPost = {
  type: postType;
  label: {
    full: string;
    short?: string;
    tiny?: string;
  };
  slug: slug;
  children: slug[];
};
type dehydratedPost = rawPost & { path: string };
type hydratedPost = dehydratedPost & { content: string };

type program<PostType> = {
  id: number;
  label: string;
  root: PostType;
  posts: PostType[];
};
type rawProgram = program<rawPost>;
type dehydratedProgram = program<dehydratedPost>;
type hydratedProgram = program<hydratedPost>;

type getRawPerformance<Performance, Payload> = {
  type: Performance;
  userId: string;
  postSlug: string;
  payload: Payload;
};
type getPostedPerformance<RawPerformance> = RawPerformance & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

type rawEvaluation = {
  performanceId: number;
  status: "accepted" | "rejected";
  evaluatorId: string;
  learnerId: string;
  feedback: string;
};
type postedEvaluation = rawEvaluation & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

type confidenceLevel = 1 | 2 | 3;
type rawViewPerformance = getRawPerformance<
  "view",
  {
    confidenceLevel: confidenceLevel;
  }
>;
type postedViewPerformance = getPostedPerformance<rawViewPerformance>;

type rawSubmissionPerformance = getRawPerformance<
  "submission",
  { url?: string; response?: string; prompt?: string }
>;
type gradedSubmissionPerformance = postedSubmissionPerformance & {
  evaluation: {
    id: number;
    status: "accepted" | "rejected";
    feedback: string;
    createdAt: string;
    updatedAt: string;
  };
};
type postedSubmissionPerformance =
  getPostedPerformance<rawSubmissionPerformance>;

type rawPromptPerformance = getRawPerformance<
  "prompt",
  { response: string; prompt: string }
>;
type postedPromptPerformance = getPostedPerformance<rawPromptPerformance>;

type rawPerformance =
  | rawViewPerformance
  | rawSubmissionPerformance
  | rawPromptPerformance;
type postedPerformance =
  | postedViewPerformance
  | postedSubmissionPerformance
  | gradedSubmissionPerformance
  | postedPromptPerformance;

type rawBroadcast = {
  slug: string;
  prompt: string;
  tags?: string;
  responseType: "markdown";
};
