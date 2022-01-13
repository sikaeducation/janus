import fs from "fs-extra";
import objectHash from "object-hash";
import getPosts from "./github";

export function mapProgramToContent(
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

export function checkProgramVersion(programId: number, hash: string) {
  return fs.pathExists(`data/hydrated-programs/${programId}/${hash}`);
}

export function getProgramVersion(programId: number) {
  return fs
    .readdir(`data/hydrated-programs/${programId}`)
    .then((files) => files[0]);
}

export function checkProgram(programId: number) {
  return fs
    .readdir(`data/hydrated-programs/${programId}`)
    .then((files) => files.length > 0);
}

export function readProgram(programId: number) {
  return fs
    .readdir(`data/hydrated-programs/${programId}`)
    .then((files) => files[0])
    .then((file) => {
      return fs.readFile(file, "utf8");
    });
}

function writeProgram(content: programData) {
  const hash = objectHash(content);
  fs.remove(`data/hydrated-programs/${content.id}/*`);
  return fs.writeJSON(`data/hydrated-programs/${content.id}/${hash}`, content);
}

function clearTempData() {
  return fs.remove("data/temp/*");
}

function getFirst<T>(array: T[]) {
  return array[0];
}

function filePathToObject(folder: string) {
  // eslint-disable-next-line
  return function (filePath: string) {
    return {
      name: filePath.split("/")[1],
      content: fs.readFile(
        `data/topics/${folder}/${filePath}/README.md`,
        "utf8"
      ),
    };
  };
}

function folderToFiles(folder: string) {
  return fs.readdir(folder).then((filePath) => {
    return filePath.map(filePathToObject(folder));
  });
}

function accumulateContent(names: string[]) {
  // eslint-disable-next-line
  const accumulator = (
    mappedFiles: Record<string, string>,
    content: string,
    index: number
  ) => {
    return {
      ...mappedFiles,
      [names[index]]: content,
    };
  };
  return (contents: string[]) => contents.reduce(accumulator, {});
}

function getNameValue<T extends { name: string }>(object: T) {
  return object.name;
}

function getContentValue<T extends { content: Promise<string> }>(object: T) {
  return object.content;
}

export function readPosts() {
  return fs
    .readdir("data/temp")
    .then(getFirst)
    .then(folderToFiles)
    .then((files) => {
      const names = files.map(getNameValue);
      return Promise.all(files.map(getContentValue)).then(
        accumulateContent(names)
      );
    });
}

export function readRawProgram(id: number) {
  return fs.readJSON(`data/raw-programs/${id}.json`);
}

export async function doEverything(id: number) {
  const rawProgram = await readRawProgram(id);
  await getPosts();
  const posts = await readPosts();
  await clearTempData();
  const mappedContent = mapProgramToContent(rawProgram, posts);
  await writeProgram(mappedContent);
}
