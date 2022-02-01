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

type rawViewPerformance = getRawPerformance<
  "view",
  {
    confidenceLevel: 1 | 2 | 3;
  }
>;
type postedViewPerformance = getPostedPerformance<rawViewPerformance>;

type rawSubmissionPerformance = getRawPerformance<
  "submission",
  { url: string }
>;
type postedSubmissionPerformance =
  getPostedPerformance<rawSubmissionPerformance>;

type rawPerformance = rawViewPerformance | rawSubmissionPerformance;
type postedPerformance = postedViewPerformance | postedSubmissionPerformance;
