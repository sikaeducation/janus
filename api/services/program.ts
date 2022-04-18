import fs from "fs-extra";
import objectHash from "object-hash";
import { map } from "lodash/fp";
import { getPostContent } from "./github";

const currentProgram: {
  1: {
    id: string;
    contents: hydratedProgram | null;
  };
} = {
  1: {
    id: "",
    contents: null,
  },
};

export async function buildAllPrograms() {
  return fs
    .readdir(`data/raw-programs`)
    .then(getAllIdsFromFileNames)
    .then(buildPrograms);
}

export async function buildProgram(id: number) {
  const dehydratedProgram = (await readDehydratedProgram(id)) || "";
  const posts = await getPostContent();

  const hydratedProgram = mapDehydratedProgramToContent(
    dehydratedProgram,
    posts
  );

  writeProgram(hydratedProgram);

  return hydratedProgram;
}

export function getProgramVersion(programId: number) {
  return programId === 1 ? currentProgram[`${programId}`].id : "";
}

export function checkProgram(programId: number) {
  return programId === 1 ? !!currentProgram[programId].id : false;
}

export function readProgram(programId: number) {
  return programId === 1 ? currentProgram[programId] : "";
}

function writeProgram(program: hydratedProgram) {
  const hash = objectHash(program);
  if (program.id === 1) {
    currentProgram[program.id].id = hash;
    currentProgram[program.id].contents = program;
    return program;
  }
  return "";
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
