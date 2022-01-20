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
type postType = "root" | "unit" | "section" | "topic" | "exercise";
type rawPost = {
  type: postType;
  label: {
    short: string;
    full: string;
    tiny: string;
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

type internalLink = {
  path: string;
  label: string;
  slug: string; // Don't coerce to slug, client doesn't have list
  isLinked?: boolean;
};
