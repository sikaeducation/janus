import { isEqual, pickBy, uniq, xor } from "lodash/fp";

function getAllChildren(program: rawProgram) {
  return uniq([
    ...program.root.children,
    ...program.posts.flatMap((post) => post.children),
  ]);
}

function getAllPostSlugs(program: rawProgram) {
  return program.posts.map((post) => post.slug);
}

function getParent(posts: rawPost[], slug: slug) {
  return posts.find((post) => post.children.includes(slug));
}

function getDuplicates(array: string[]) {
  return Object.entries(
    array.reduce((counts: Record<string, number>, slug: string) => {
      return {
        ...counts,
        [slug]: counts[slug] ? counts[slug] + 1 : 1,
      };
    }, {})
  )
    .filter(([key, value]) => value > 1)
    .map(([key, value]) => key);
}

function childrenMatchPosts(program: rawProgram) {
  const slugs = getAllPostSlugs(program).sort();
  const duplicates = getDuplicates(slugs);
  if (duplicates.length > 0)
    return new Error(
      `These posts have more than one entry: ${duplicates.join(", ")}`
    );

  const children = getAllChildren(program).sort();
  const unmatchedSlugs = xor(children, slugs);
  return isEqual(slugs, children)
    ? true
    : new Error(`Children must match posts: ${unmatchedSlugs}`);
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

export default function prepareProgram(program: rawProgram) {
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
