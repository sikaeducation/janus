// New Types
type ActivityType = "Article";

type MongoDocument = {
  _id?: string;
  created_at?: string;
  updated_at?: string;
};

type Activity = {
  _type: ActivityType;
  title: string;
  published: boolean;
  tags?: string[];
  notes?: string;
  description?: string;
} & MongoDocument;

type ActivityArticle = Activity & {
  post_slug: string;
  content?: string;
};

type ActivityResponse = {
  activities: Record<string, Activity>;
};

type User = {
  email: string;
  "https://sikaeducation.com/role"?: "coach";
  name: string;
  picture: string;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Old Types
type Clobber<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};
type postType =
  | "root"
  | "meta"
  | "unit"
  | "section"
  | "topic"
  | "exercise"
  | "guide"
  | "concept"
  | "questions";
type rawPost = {
  type: postType;
  label: {
    full: string;
    short?: string;
    tiny?: string;
  };
  slug: string;
  children: string[];
  isHidden?: boolean;
  isRequired?: boolean;
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
  feedback?: string;
  evaluatorId: string;
  learnerId: string;
};
type postedEvaluation = rawEvaluation & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

type performanceType = "view" | "submission" | "prompt" | "question";

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
  { url: string }
>;
type postedSubmissionPerformance =
  getPostedPerformance<rawSubmissionPerformance>;
type evaluatedSubmissionPerformance = postedSubmissionPerformance & {
  evaluation?: postedEvaluation;
};

type rawPromptPerformance = getRawPerformance<
  "prompt",
  { response: string; prompt: string }
>;
type postedPromptPerformance = getPostedPerformance<rawPromptPerformance>;

type rawQuestionPerformance = getRawPerformance<
  "question",
  {
    response: string;
    prompt: string;
    originalPostSlug: string;
    answer?: string;
  }
>;
type postedQuestionPerformance = getPostedPerformance<rawQuestionPerformance>;
type evaluatedQuestionPerformance = postedQuestionPerformance & {
  evaluation?: postedEvaluation;
};

type rawPerformance =
  | rawViewPerformance
  | rawSubmissionPerformance
  | rawPromptPerformance
  | rawQuestionPerformance;
type postedPerformance =
  | postedViewPerformance
  | postedSubmissionPerformance
  | postedPromptPerformance
  | postedQuestionPerformance;
type evaluatedPerformance =
  | postedPerformance
  | evaluatedSubmissionPerformance
  | evaluatedQuestionPerformance;

type rawBroadcast = {
  slug?: string;
  prompt: string;
  tags?: string;
  responseType: "markdown";
};
