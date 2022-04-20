"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebHook = exports.getPostContent = void 0;
const rest_1 = require("@octokit/rest");
const adm_zip_1 = __importDefault(require("adm-zip"));
const axios_1 = __importDefault(require("axios"));
const fp_1 = require("lodash/fp");
const crypto_1 = __importDefault(require("crypto"));
function getArchiveUrl() {
    const octokit = new rest_1.Octokit({
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
function getFiles(url) {
    return axios_1.default.get(url, { responseType: "arraybuffer" }).then((response) => {
        const zip = new adm_zip_1.default(response.data);
        return zip.getEntries();
    });
}
function entryToFile(entry) {
    return {
        name: entry.entryName.split("/")[1],
        content: entry.getData().toString("utf8"),
    };
}
function processFiles(entries) {
    const files = entries
        .filter((entry) => entry.name === "README.md")
        .map(entryToFile);
    return (0, fp_1.flow)([(0, fp_1.keyBy)("name"), (0, fp_1.mapValues)("content")])(files);
}
function getPostContent() {
    return getArchiveUrl()
        .then(getFiles)
        .then(processFiles)
        .catch((error) => {
        // eslint-disable-next-line
        console.error(error.message);
        return {};
    });
}
exports.getPostContent = getPostContent;
function verifyWebHook(request) {
    const GITHUB_WEBHOOK_TOKEN = process.env.GITHUB_WEBHOOK_TOKEN || "";
    const signature = Buffer.from(request.get("X-Hub-Signature-256") || "", "utf8");
    const hmac = crypto_1.default.createHmac("sha256", GITHUB_WEBHOOK_TOKEN);
    const digest = Buffer.from(`sha256=${hmac.update(JSON.stringify(request.body)).digest("hex")}`, "utf8");
    return crypto_1.default.timingSafeEqual(signature, digest);
}
exports.verifyWebHook = verifyWebHook;
//# sourceMappingURL=github.js.map