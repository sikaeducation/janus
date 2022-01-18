/* eslint @typescript-eslint/no-non-null-assertion: "off" */

function getFirstUnit(posts: post[], unitIds: number[]) {
  return posts.find((post) => post.id === unitIds[0]);
}

function pathTo(posts: post[], id: number) {
  const path = [];
  const someCondition = false;
  do {
    const parentId = posts.find((post) => post.children.includes(id));
    if (parentId) path.unshift(parentId);
  } while (someCondition);
  return `/${path.join("/")}`;
}

export default function getNextLink(
  posts: post[],
  currentPost: post,
  rootPost: Omit<post, "id">
): internalLink | null {
  // Root Node
  if (currentPost.slug === rootPost.slug) {
    return {
      label: `Start ${currentPost.label.short}`,
      path: `/${getFirstUnit(posts, currentPost.children)}`,
    };
  }

  // End of sequence
  const parent =
    posts.find((allPosts) => allPosts.children.includes(currentPost.id)) ||
    (rootPost as post);
  const currentIndex = parent.children.indexOf(currentPost.id);
  if (currentIndex === parent.children.length - 1) {
    return {
      label: `Back to ${parent.label.short}`,
      path: parent.id ? pathTo(posts, parent.id) : "/",
    };
  }

  // Next sibling
  const nextSiblingId = parent.children[currentIndex + 1];
  const nextSibling = posts.find((post) => post.id === nextSiblingId)!;
  return {
    label: `Next: ${nextSibling.label.short}`,
    path: pathTo(posts, nextSibling.id),
  };
}
