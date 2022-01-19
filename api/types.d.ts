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

type postNoContent = Omit<post, "content">;

type programData = {
  id: number;
  label: string;
  root: post | postNoContent;
  posts: post[] | postNoContent[];
};
