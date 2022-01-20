import { isEqual, difference } from "lodash/fp";

function getAllChildren(program: dehydratedProgram) {
  return [
    ...program.root.children,
    ...program.posts.flatMap((post) => post.children),
  ];
}

function getAllPostSlugs(program: dehydratedProgram) {
  return program.posts.map((post) => post.slug);
}

function getParent(posts: rawPost[], slug: slug) {
  return posts.find((post) => post.children.includes(slug));
}

function childrenMatchPosts(program: dehydratedProgram) {
  const slugs: slug[] = getAllPostSlugs(program).sort();
  const children: slug[] = getAllChildren(program).sort();
  const differential = difference(slugs, children);
  return isEqual(slugs, children)
    ? true
    : new Error(`Children must match posts: ${differential}`);
}

function getPath(posts: rawPost[], slug: slug) {
  const segments = [slug];
  let parent = getParent(posts, slug);
  while (parent) {
    segments.unshift(parent.slug);
    parent = getParent(posts, parent.slug);
  }
  return `/${segments.join("/")}`;
}

export default function prepareProgram(program: dehydratedProgram) {
  if (!program.root.children.length) {
    return new Error("Root post needs children");
  }
  const match = childrenMatchPosts(program);
  if (match instanceof Error) return match;
  return {
    ...program,
    root: {
      ...program.root,
      path: "/",
    },
    posts: program.posts.map((post) => {
      return {
        ...post,
        path: getPath(program.posts, post.slug),
      };
    }),
  };
}
