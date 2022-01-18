/* eslint @typescript-eslint/no-non-null-assertion: "off" */

export default function getNextLink(
  posts: post[],
  currentPost: post,
  rootPost: Omit<post, "id">
): internalLink | null {
  const unitIds = rootPost.children;

  // Is root
  if (currentPost === rootPost) {
    const firstUnit = posts.find((post) => post.id === unitIds[0]);
    return firstUnit
      ? {
          label: `Start ${firstUnit.label.short}`,
          path: firstUnit.path,
        }
      : null;
  }

  // Is unit
  if (unitIds.includes(currentPost.id)) {
    const firstSection = posts.find(
      (post) => post.id === currentPost.children[0]
    );
    return firstSection
      ? {
          label: `Start ${firstSection.label.short}`,
          path: firstSection.path,
        }
      : null;
  }

  // Is last
  const parent = posts.find((post) => post.children.includes(currentPost.id))!;
  const currentIndex = parent.children.indexOf(currentPost.id);
  if (currentIndex === parent.children.length - 1) {
    return {
      label: `Back to ${parent.label.short}`,
      path: parent.path,
    };
  }

  // Has more
  const nextSiblingId = parent.children[currentIndex + 1];
  const nextSibling = posts.find((post) => post.id === nextSiblingId);
  return nextSibling
    ? {
        label: `Next: ${nextSibling.label.short}`,
        path: nextSibling.path,
      }
    : null;
}
