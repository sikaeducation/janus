type postType = "unit" | "section" | "topic" | "exercise";

type post = {
  id: number;
  type: postType;
  label: {
    short: string;
    full: string;
    tiny: string;
  };
  slug: string;
  path: string;
  content: string;
  children: number[];
};

type internalLink = {
  path: string;
  label: string;
  id?: number;
  isLinked?: boolean;
};
