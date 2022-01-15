import fs from "fs-extra";
import objectHash from "object-hash";
import { map } from "lodash/fp";
import { getPosts } from "./github";

function mapRawProgramToContent(
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
    .then((files) => {
      return files[0];
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error.message);
      return "";
    });
}

export async function checkProgram(programId: number) {
  return fs
    .readdir(`data/hydrated-programs/${programId}`)
    .then((files) => files?.length > 0)
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error.message);
      return false;
    });
}

export function readProgram(programId: number) {
  return getProgramVersion(programId).then((version) => {
    return fs.readJSON(
      `data/hydrated-programs/${programId}/${version}`,
      "utf8"
    );
  });
}

function writeProgram(program: programData) {
  const hash = objectHash(program);
  return fs
    .remove(`data/hydrated-programs/${program.id}/*`)
    .then(() => fs.ensureDir(`data/hydrated-programs/${program.id}`))
    .then(() => {
      return fs.writeJSON(
        `data/hydrated-programs/${program.id}/${hash}`,
        program
      );
    })
    .then(() => program);
}

function readRawProgram(id: number) {
  return fs.readJSON(`data/raw-programs/${id}.json`);
}

export async function buildProgram(id: number) {
  const rawProgram = (await readRawProgram(id)) || "";
  const posts = await getPosts();

  const hydratedProgram = mapRawProgramToContent(
    rawProgram,
    posts as Record<string, string>
  );

  await writeProgram(hydratedProgram);

  return hydratedProgram;
}

function getIdFromFile(file: string) {
  return +file.split(".")[0];
}

function getAllIdsFromFileNames(fileNames: string[]) {
  return map(getIdFromFile)(fileNames);
}

function buildPrograms(programIds: number[]) {
  return Promise.all(programIds.map(buildProgram));
}

export async function buildAllPrograms() {
  return fs
    .readdir(`data/raw-programs`)
    .then(getAllIdsFromFileNames)
    .then(buildPrograms);
}
