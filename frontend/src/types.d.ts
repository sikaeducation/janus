type postType = "root" | "unit" | "section" | "topic" | "exercise";

type post = {
  id: number;
  type: postType;
  label: {
    short: string;
    full: string;
    tiny: string;
  };
  path: string;
  slug: string;
  content: string;
  children: number[];
};

type internalLink = {
  path: string;
  label: string;
  id?: number;
  isLinked?: boolean;
};

type programData = {
  id: number;
  label: string;
  root: post;
  posts: post[];
};
