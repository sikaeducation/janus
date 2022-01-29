import { readdir, writeFile } from "fs-extra";

export default async function postsToTypes() {
  if (!process.env.POSTS_DIRECTORY)
    throw new Error("Environment variable POSTS_DIRECTORY must be defined");
  if (!process.env.SLUGS_LOCATION)
    throw new Error("Environment variable SLUGS_LOCATION must be defined");
  const directories = await readdir(process.env.POSTS_DIRECTORY || "");
  const slugs = directories.map((directory) => `"${directory}"`).join(" | ");
  writeFile(process.env.SLUGS_LOCATION, `type slug = ${slugs};`);
}
