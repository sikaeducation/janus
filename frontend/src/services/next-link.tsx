import data from "../data";

function postToLink(message: string, { path, label }: post) {
  return {
    path,
    label: `${message} ${label.short}`,
  };
}

export default function getNextLink(currentPost: post): internalLink | null {
  const { posts } = data.program;
  if (currentPost.children.length) return null; // No next for a parent node

  const parent = posts.find((allPosts) =>
    allPosts.children.includes(currentPost.id)
  );
  if (!parent) return null; // No next for a root node

  const siblings = posts.filter((post) => {
    return parent.children.includes(post.id);
  });
  const currentIndex = siblings.findIndex(
    (sibling) => sibling.id === currentPost.id
  );
  const currentIsLast = currentIndex === siblings.length - 1;
  if (!currentIsLast) return postToLink("Next:", siblings[currentIndex + 1]); // Next sibling

  return parent ? postToLink("Back to", parent) : null; // Return to parent if last
}
