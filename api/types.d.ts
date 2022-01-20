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
type hydratedProgram = program<Clober<hydratedPost, { root: { path: "/" } }>>;
type dehydratedProgram = program<
  Clober<dehydratedPost, { root: { path: "/" } }>
>;
type rawProgram = program<rawPost>;
