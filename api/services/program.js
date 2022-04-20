"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readProgram = exports.checkProgram = exports.getProgramVersion = exports.buildProgram = exports.buildAllPrograms = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const object_hash_1 = __importDefault(require("object-hash"));
const fp_1 = require("lodash/fp");
const github_1 = require("./github");
const currentProgram = {
    1: {
        id: "",
        contents: null,
    },
};
buildProgram(1);
function buildAllPrograms() {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_extra_1.default
            .readdir(`data/raw-programs`)
            .then(getAllIdsFromFileNames)
            .then(buildPrograms);
    });
}
exports.buildAllPrograms = buildAllPrograms;
function buildProgram(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const dehydratedProgram = (yield readDehydratedProgram(id)) || "";
        const posts = yield (0, github_1.getPostContent)();
        const hydratedProgram = mapDehydratedProgramToContent(dehydratedProgram, posts);
        writeProgram(hydratedProgram);
        return hydratedProgram;
    });
}
exports.buildProgram = buildProgram;
function getProgramVersion(programId) {
    return programId === 1 ? currentProgram[`${programId}`].id : "";
}
exports.getProgramVersion = getProgramVersion;
function checkProgram(programId) {
    return programId === 1 ? !!currentProgram[programId].id : false;
}
exports.checkProgram = checkProgram;
function readProgram(programId) {
    return programId === 1 ? currentProgram[programId].contents : "";
}
exports.readProgram = readProgram;
function writeProgram(program) {
    const hash = (0, object_hash_1.default)(program);
    if (program.id === 1) {
        currentProgram[program.id].id = hash;
        currentProgram[program.id].contents = program;
        return program;
    }
    return "";
}
function readDehydratedProgram(id) {
    return fs_extra_1.default.readJSON(`data/dehydrated-programs/${id}.json`);
}
function getIdFromFile(file) {
    return +file.split(".")[0];
}
function getAllIdsFromFileNames(fileNames) {
    return (0, fp_1.map)(getIdFromFile)(fileNames);
}
function buildPrograms(programIds) {
    return Promise.all(programIds.map(buildProgram));
}
function mapDehydratedProgramToContent(program, content) {
    const hydratedProgram = Object.assign(Object.assign({}, program), { root: Object.assign(Object.assign({}, program.root), { content: content[program.root.slug] }), posts: program.posts.map((post) => {
            const hydratedPost = Object.assign(Object.assign({}, post), { content: content[post.slug] });
            return hydratedPost;
        }) });
    return hydratedProgram;
}
//# sourceMappingURL=program.js.map