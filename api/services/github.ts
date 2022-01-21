import { Octokit } from "@octokit/rest";
import AdmZip, { IZipEntry } from "adm-zip";
import axios from "axios";
import { flow, mapValues, keyBy } from "lodash/fp";
import { Request } from "express";
import crypto from "crypto";

function getArchiveUrl() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  return octokit.rest.repos
    .downloadZipballArchive({
      owner: "sikaeducation",
      repo: "posts",
      ref: "master",
    })
    .then((response) => response.url);
}

function getFiles(url: string) {
  return axios.get(url, { responseType: "arraybuffer" }).then((response) => {
    const zip = new AdmZip(response.data);
    return zip.getEntries();
  });
}

function entryToFile(entry: IZipEntry) {
  return {
    name: entry.entryName.split("/")[1],
    content: entry.getData().toString("utf8"),
  };
}

function processFiles(entries: IZipEntry[]) {
  const files = entries
    .filter((entry) => entry.name === "README.md")
    .map(entryToFile);
  return flow([keyBy("name"), mapValues("content")])(files);
}

export function getPostContent() {
  return getArchiveUrl()
    .then(getFiles)
    .then(processFiles)
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error.message);
      return {};
    });
}

export function verifyWebHook(request: Request) {
  const GITHUB_WEBHOOK_TOKEN = process.env.GITHUB_WEBHOOK_TOKEN || "";

  const signature = Buffer.from(
    request.get("X-Hub-Signature-256") || "",
    "utf8"
  );
  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_TOKEN);
  const digest = Buffer.from(
    `sha256=${hmac.update(request.body).digest("hex")}`,
    "utf8"
  );

  return crypto.timingSafeEqual(signature, digest);
}
