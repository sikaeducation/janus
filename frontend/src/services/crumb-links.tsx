/* eslint @typescript-eslint/no-non-null-assertion: "off" */

function getAncestorIds(posts: post[], currentIds: number[]): number[] {
  if (currentIds.length === 0) return [];
  const head = currentIds[0];
  const foundId = posts.find((post) => post.children.includes(head))?.id;
  return !foundId
    ? currentIds.reverse()
    : getAncestorIds(posts, [foundId, ...currentIds]);
}

export default function getCrumbLinks(posts: post[], currentPost: post) {
  return [];
  // const ancestorIds = getAncestorIds(posts, [currentPost.id]);
  // return ancestorIds
  //   .map((id) => posts.find((post) => post.id === id)!)
  //   .map((post, index) => ({
  //     id: index,
  //     label: post.label.short,
  //     path: post.path,
  //   }))
  //   .reverse();
}
