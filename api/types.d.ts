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
type hydratedProgram = program<hydratedPost>;
type dehydratedProgram = program<dehydratedPost>;
type rawProgram = program<rawPost>;
