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

type payloadType = "topic-view";

type payload = {
  type: payloadType;
};

type confidenceLevel = 1 | 2 | 3;
type topicViewPayload = payload & { confidenceLevel: confidenceLevel };

type rawActivity<PayloadType> = {
  userId: string;
  postSlug: string;
  payload: PayloadType;
};

type topicViewActivity = rawActivity<topicViewPayload>;

type activity = topicViewActivity;
