function getParent(posts: rawPost[], slug: slug) {
  return posts.find((post) => post.children.includes(slug));
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

export default function programChecker(
  program: rawProgram
): rawProgramWithPaths {
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
