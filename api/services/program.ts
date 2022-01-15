import fs from "fs-extra";
import objectHash from "object-hash";
import { map } from "lodash/fp";
import { getPosts } from "./github";

function mapProgramToContent(
  program: programData,
  content: Record<string, string>
) {
  return {
    ...program,
    posts: program.posts.map((post) => {
      return {
        ...post,
        content: content[post.slug],
      };
    }),
  };
}

export function getProgramVersion(programId: number) {
  return fs
    .readdir(`data/hydrated-programs/${programId}`)
    .then((files) => files[0]);
}

export async function checkProgram(programId: number) {
  try {
    const files = await fs.readdir(`data/hydrated-programs/${programId}`);
    return !!files?.length;
  } catch {
    return false;
  }
}

export function readProgram(programId: number) {
  return getProgramVersion(programId).then((file) => {
    return fs.readJSON(`data/hydrated-programs/${programId}/${file}`, "utf8");
  });
}

function writeProgram(content: programData) {
  const hash = objectHash(content);
  fs.remove(`data/hydrated-programs/${content.id}/*`);
  return fs
    .writeJSON(`data/hydrated-programs/${content.id}/${hash}`, content)
    .then(() => content);
}

function readRawProgram(id: number) {
  return fs.readJSON(`data/raw-programs/${id}.json`);
}

export async function createProgram(id: number) {
  const rawProgram = (await readRawProgram(id)) || "";

  const posts = await getPosts();

  const mappedContent = mapProgramToContent(
    rawProgram,
    posts as Record<string, string>
  );
  return writeProgram(mappedContent);
}

function getIdFromFile(file: string) {
  return +file.split(".")[0];
}

function getAllIdsFromFileNames(fileNames: string[]) {
  return map(getIdFromFile)(fileNames);
}

function buildAll(programIds: number[]) {
  return Promise.all(programIds.map(createProgram));
}

export async function buildPrograms() {
  return fs
    .readdir(`data/raw-programs`)
    .then(getAllIdsFromFileNames)
    .then(buildAll);
}
