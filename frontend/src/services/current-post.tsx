/* eslint @typescript-eslint/no-non-null-assertion: "off" */
import data from "../data";

export default function getCurrentPost(path: string) {
  const {
    program: { posts },
  } = data; // Fetch or get from localStorage

  return posts.find((post) => post.path === path)!;
}
