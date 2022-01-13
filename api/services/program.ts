// Read the program file
// Get updated content
// Map the program to the content
// Delete downloaded content
// Store hydrated program in a file with a version
// Send it back on request

import fs from "fs/promises";

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

export function getContent() {
  return fs
    .readdir("data/topics")
    .then(getFirst)
    .then(folderToFiles)
    .then((files) => {
      const names = files.map(getNameValue);
      return Promise.all(files.map(getContentValue)).then(
        accumulateContent(names)
      );
    });
}

export function getProgram(id: number) {
  return fs.readFile(`data/programs/${id}.ts`, "utf8").catch((error) => {
    // eslint-disable-next-line
    console.error(error.message);
  });
}
