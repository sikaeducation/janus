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

type rawPostWithPath = rawPost & { path: string };

type rawProgram = {
  id: number;
  label: string;
  root: rawPost;
  posts: rawPost[];
};

type rawProgramWithPaths = {
  id: number;
  label: string;
  root: rawPostWithPath;
  posts: rawPostWithPath[];
};

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
