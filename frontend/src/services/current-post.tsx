/* eslint @typescript-eslint/no-non-null-assertion: "off" */
import data from "../data";

export default function getCurrentPost(path: string) {
  const {
    program: { posts },
  } = data; // Fetch or get from localStorage
  const normalizedPath = path || "/";

  return posts.find((post) => post.path === normalizedPath)!;
}
