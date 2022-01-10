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

type programData = {
  id: number;
  label: string;
  posts: post[];
};
