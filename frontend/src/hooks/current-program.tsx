import data from "../data";

function getUnitLinks(posts: post[]) {
  return posts.map((unit) => ({
    id: unit.id,
    label: unit.label.tiny,
    path: `${unit.path}`,
  }));
}

export default function currentProgram() {
  const { program } = data; // Fetch or read from localStorage
  const allChildrenIds = program.posts
    .map((post) => post.children)
    .filter((x) => x)
    .flat();
  const postsWithNoParents = program.posts.filter(
    (post) => !allChildrenIds.includes(post.id)
  );
  const unitLinks = getUnitLinks(postsWithNoParents);

  return {
    program,
    unitLinks,
  };
}
