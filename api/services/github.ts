import { Octokit } from "@octokit/rest";
import download from "download";

export function getArchiveUrl() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  return octokit.rest.repos
    .downloadTarballArchive({
      owner: "sikaeducation",
      repo: "posts",
      ref: "master",
    })
    .then((response) => {
      return response.url;
    });
}

export function downloadArchive(url: string) {
  return download(url, "data/posts", { extract: true });
}

export function processFiles() {
  // eslint-disable-next-line
  console.log("Files downloaded");
}

export default function getPosts() {
  return getArchiveUrl()
    .then(downloadArchive)
    .then(processFiles)
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error.message);
    });
}
