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

type payloadType = "topic-view" | "exercise-submission";

type payload = {
  type: payloadType;
};

type confidenceLevel = 1 | 2 | 3;
type topicViewPayload = payload & { confidenceLevel: confidenceLevel };
type exerciseSubmissionPayload = payload & { url: string };

type getRawPerformance<PayloadType> = {
  userId: string;
  postSlug: string;
  payload: PayloadType;
};
type getPostedPerformance<PayloadType> = rawPerformance<PayloadType> & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

type rawTopicViewPerformance = getRawPerformance<topicViewPayload>;
type postedTopicViewPerformance = getPostedPerformance<topicViewPayload>;

type rawExerciseSubmissionPerformance =
  getRawPerformance<exerciseSubmissionPayload>;
type postedExerciseSubmissionPerformance =
  getPostedPerformance<exerciseSubmissionPayload>;

type rawPerformance =
  | rawTopicViewPerformance
  | rawExerciseSubmissionPerformance;
type postedPerformance =
  | postedTopicViewPerformance
  | postedExerciseSubmissionPerformance;
