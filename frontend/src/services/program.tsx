/* eslint @typescript-eslint/no-non-null-assertion: "off" */
import { useEffect, useState } from "react";

function getNextLink(
  posts: hydratedPost[],
  currentPost: hydratedPost,
  rootPost: hydratedPost
): internalLink | null {
  const unitSlugs = rootPost.children;

  // Is root
  if (currentPost === rootPost) {
    const firstUnit = posts.find((post) => post.slug === unitSlugs[0]);
    return firstUnit
      ? {
          slug: firstUnit.slug,
          label: `Start ${firstUnit.label.short}`,
          path: firstUnit.path,
        }
      : null;
  }

  // Is unit
  if (unitSlugs.includes(currentPost.slug)) {
    const firstSection = posts.find(
      (post) => post.slug === currentPost.children[0]
    );
    return firstSection
      ? {
          slug: firstSection.slug,
          label: `Start ${firstSection.label.short}`,
          path: firstSection.path,
        }
      : null;
  }

  // Is last
  const parent = posts.find((post) =>
    post.children.includes(currentPost.slug)
  )!;
  const currentIndex = parent.children.indexOf(currentPost.slug);
  if (currentIndex === parent.children.length - 1) {
    return {
      slug: parent.slug,
      label: `Back to ${parent.label.short}`,
      path: parent.path,
    };
  }

  // Has more
  const nextSiblingId = parent.children[currentIndex + 1];
  const nextSibling = posts.find((post) => post.slug === nextSiblingId);
  return nextSibling
    ? {
        slug: nextSibling.slug,
        label: `Next: ${nextSibling.label.short}`,
        path: nextSibling.path,
      }
    : null;
}

function getUnitLinks(
  posts: hydratedPost[],
  unitSlugs: string[],
  currentPath: string
) {
  return posts
    .filter((post) => unitSlugs.includes(post.slug))
    .map((unit) => ({
      slug: unit.slug,
      path: unit.path,
      label: unit.label.tiny,
      isActive: currentPath.startsWith(`/${unit.slug}`),
    }));
}

function getCrumbLinks(posts: hydratedPost[], currentPath: string) {
  const normalizedPath = currentPath.substring(1);
  if (!normalizedPath) return [];
  const sections = normalizedPath.split("/");
  return sections.map((section) => {
    const matchingPost = posts.find((post) => post.slug === section)!;
    return {
      slug: matchingPost.slug,
      label: matchingPost.label.short,
      path: matchingPost.path,
    };
  });
}

export function useProgram(id: number): hydratedProgram | null {
  const [program, setProgram] = useState<hydratedProgram | null>(null);
  useEffect(() => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiBaseUrl}/programs/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setProgram(response.program);
      })
      .catch((error) => {
        // eslint-disable-next-line
          console.error(error.message);
      });
  }, [id]);

  return program;
}

export function getLinks(program: hydratedProgram, currentPost: hydratedPost) {
  const unitLinks = getUnitLinks(
    program.posts,
    program.root.children,
    currentPost.path
  );
  const crumbLinks = getCrumbLinks(program.posts, currentPost.path);
  const nextLink = getNextLink(program.posts, currentPost, program.root);

  return {
    unitLinks,
    crumbLinks,
    nextLink,
  };
}

export function getCurrentPost(posts: hydratedPost[], path: string) {
  return posts.find((post) => post.path === path);
}
