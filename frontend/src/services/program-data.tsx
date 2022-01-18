/* eslint @typescript-eslint/no-non-null-assertion: "off" */
import { useEffect, useState } from "react";

function getNextLink(
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

function getUnitLinks(posts: post[], unitIds: number[], currentPath: string) {
  return posts
    .filter((post) => unitIds.includes(post.id))
    .map((unit) => ({
      id: unit.id,
      path: `/${unit.slug}`,
      label: unit.label.tiny,
      isActive: currentPath.startsWith(`/${unit.slug}`),
    }));
}

function getCrumbLinks(posts: post[], currentPath: string) {
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

export function useProgram(id: number): programData | null {
  const [program, setProgram] = useState<programData | null>(null);
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

export function getLinks(program: programData, currentPost: post) {
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

export function getCurrentPost(posts: post[], path: string) {
  const segments = path.split("/");
  const slug = segments[segments.length - 1];
  return posts.find((post) => post.slug === slug);
}
