import data from "../data";
import {} from "./current-content";

function getUnitLinks(posts: post[], currentPath: string) {
  return posts.map((unit) => ({
    id: unit.id,
    label: unit.label.tiny,
    path: `${unit.path}`,
    isActive: currentPath.startsWith(unit.path),
  }));
}

export default function currentProgram(currentPath: string) {
  const { program } = data; // Fetch or read from localStorage
  const allChildrenIds = program.posts
    .map((post) => post.children)
    .filter((x) => x)
    .flat();
  const postsWithNoParents = program.posts.filter(
    (post) => !allChildrenIds.includes(post.id)
  );
  const unitLinks = getUnitLinks(postsWithNoParents, currentPath);

  return {
    program,
    unitLinks,
  };
}
