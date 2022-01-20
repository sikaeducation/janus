import { readdir, writeFile } from "fs-extra";

export default async function postsToTypes() {
  const directories = await readdir("../../../../topics");
  const slugs = directories.map((directory) => `"${directory}"`).join(" | ");
  writeFile("../slug.d.ts", `type slug = ${slugs};`);
}
