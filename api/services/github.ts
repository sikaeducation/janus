import { Octokit } from "@octokit/rest";
import AdmZip, { IZipEntry } from "adm-zip";
import axios from "axios";
import { flow, mapValues, keyBy } from "lodash/fp";

export function getArchiveUrl() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  return octokit.rest.repos
    .downloadZipballArchive({
      owner: "sikaeducation",
      repo: "posts",
      ref: "master",
    })
    .then((response) => {
      return response.url;
    });
}

function getFiles(url: string) {
  return axios.get(url, { responseType: "arraybuffer" }).then((response) => {
    const zip = new AdmZip(response.data);
    return zip.getEntries();
  });
}

function processFiles(entries: IZipEntry[]) {
  const files = entries
    .filter((entry) => entry.name === "README.md")
    .map((entry) => {
      return {
        name: entry.entryName.split("/")[1],
        content: entry.getData().toString("utf8"),
      };
    });
  return flow([keyBy("name"), mapValues("content")])(files);
}

export default function getPosts() {
  return getArchiveUrl()
    .then(getFiles)
    .then(processFiles)
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error.message);
      return {};
    });
}
