/* eslint @typescript-eslint/no-shadow: "off", @typescript-eslint/no-non-null-assertion: "off" */
import data from "../data";

function getAncestorIds(posts: post[], currentIds: number[]): number[] {
  if (currentIds.length === 0) return [];
  const head = currentIds[0];
  const foundId = posts.find((post) => post.children.includes(head))?.id;
  return !foundId
    ? currentIds.reverse()
    : getAncestorIds(posts, [foundId, ...currentIds]);
}

function getCrumbs(posts: post[], ancestorIds: number[]) {
  return ancestorIds
    .map((id) => posts.find((post) => post.id === id)!)
    .map((post, index) => ({
      id: index,
      label: post.label.short,
      path: post.path,
    }))
    .reverse();
}

function postToLink({ path, label }: post) {
  return {
    path,
    label: label.short,
  };
}

function getNext(posts: post[], post: post): internalLink | null {
  if (post.children.length) return null; // No next for a parent node

  const parent = posts.find((allPosts) => allPosts.children.includes(post.id));
  if (!parent) return null; // No next for a root node

  const siblings = posts.filter((post) => {
    return parent.children.includes(post.id);
  });
  const currentIndex = siblings.findIndex((sibling) => sibling.id === post.id);
  const currentIsLast = currentIndex === siblings.length - 1;
  if (!currentIsLast) return postToLink(siblings[currentIndex + 1]); // Next sibling

  return parent ? postToLink(parent) : null; // Return to parent if last
}

export default function currentContent(path: string) {
  const {
    program: { posts },
  } = data; // Fetch or get from localStorage

  const defaultPath = posts[0].path; // This is bad, do it on the router instead
  const normalizedPath = path || defaultPath;

  const currentPost = posts.find((post) => post.path === normalizedPath)!;
  const ancestorIds: number[] = getAncestorIds(posts, [currentPost.id]);

  return {
    content: currentPost.content,
    crumbs: getCrumbs(posts, ancestorIds),
    next: getNext(posts, currentPost),
  };
}
