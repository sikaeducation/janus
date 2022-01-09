import data from "../data";

function generateUnitLinks(posts: post[], currentPath: string) {
  return posts.map((unit) => ({
    id: unit.id,
    label: unit.label.tiny,
    path: `${unit.path}`,
    isActive: currentPath.startsWith(unit.path),
  }));
}

export default function getUnitLinks(currentPath: string) {
  const { program } = data; // Fetch or read from localStorage
  const allChildrenIds = program.posts
    .map((post) => post.children)
    .filter((x) => x)
    .flat();
  const postsWithNoParents = program.posts.filter(
    (post) => !allChildrenIds.includes(post.id)
  );

  return generateUnitLinks(postsWithNoParents, currentPath);
}
