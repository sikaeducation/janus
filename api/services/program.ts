import fs from "fs-extra";
import objectHash from "object-hash";
import { map } from "lodash/fp";
import { getPosts } from "./github";

export async function buildAllPrograms() {
  return fs
    .readdir(`data/raw-programs`)
    .then(getAllIdsFromFileNames)
    .then(buildPrograms);
}

export async function buildProgram(id: number) {
  const dehydratedProgram = (await readDehydratedProgram(id)) || "";
  const posts = await getPosts();

  const hydratedProgram = mapDehydratedProgramToContent(
    dehydratedProgram,
    posts
  );

  await writeProgram(hydratedProgram);

  return hydratedProgram;
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

function writeProgram(program: hydratedProgram) {
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

function readDehydratedProgram(id: number) {
  return fs.readJSON(`data/dehydrated-programs/${id}.json`);
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

function mapDehydratedProgramToContent(
  program: dehydratedProgram,
  content: Record<string, string>
) {
  const hydratedProgram: hydratedProgram = {
    ...program,
    root: {
      ...program.root,
      content: content[program.root.slug],
    },
    posts: program.posts.map((post) => {
      const hydratedPost: hydratedPost = {
        ...post,
        content: content[post.slug],
      };
      return hydratedPost;
    }),
  };
  return hydratedProgram;
}
