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
  slug: string;
  children: string[];
};
type dehydratedPost = rawPost & { path: string };
type hydratedPost = dehydratedPost & { content: string };

type program<PostType> = {
  id: number;
  label: string;
  root: PostType;
  posts: PostType[];
};
type hydratedProgram = program<hydratedPost>;

type internalLink = {
  path: string;
  label: string;
  slug: string; // Don't coerce to slug, client doesn't have list
  isLinked?: boolean;
};

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
  feedback: string;
  evaluatorId: string;
  learnerId: string;
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
type postedSubmissionPerformance =
  getPostedPerformance<rawSubmissionPerformance>;
type evaluatedSubmissionPerformance = postedSubmissionPerformance & {
  evaluation?: postedEvaluation;
};

type rawPerformance = rawViewPerformance | rawSubmissionPerformance;
type postedPerformance = postedViewPerformance | postedSubmissionPerformance;
type evaluatedPerformance = postedPerformance | evaluatedSubmissionPerformance;

type rawBroadcast = {
  slug: string;
  prompt: string;
  tags?: string;
  responseType: "markdown";
};
