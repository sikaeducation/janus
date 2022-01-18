// function generateUnitLinks(posts: post[], currentPath: string) {
//   return posts.map((unit) => ({
//     id: unit.id,
//     label: unit.label.tiny,
//     path: `${unit.path}`,
//     isActive: currentPath.startsWith(unit.path),
//   }));
// }

// export default function getUnitLinks(posts: post[], currentPath: string) {
//   const allChildrenIds = posts
//     .map((post) => post.children)
//     .filter((x) => x)
//     .flat();
//   const postsWithNoParents = posts.filter(
//     (post) => !allChildrenIds.includes(post.id)
//   );

//   return generateUnitLinks(postsWithNoParents, currentPath);
// }
export {};
