/* eslint @typescript-eslint/no-non-null-assertion: "off" */

export default function getCrumbLinks(posts: post[], currentPath: string) {
  const normalizedPath = currentPath.substring(1);
  if (!normalizedPath) return [];
  const sections = normalizedPath.split("/");
  return sections.map((section) => {
    const matchingPost = posts.find((post) => post.slug === section)!;
    return {
      id: matchingPost.id,
      label: matchingPost.label.short,
      path: matchingPost.path,
    };
  });
}
