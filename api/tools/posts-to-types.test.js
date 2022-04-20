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
const fs_extra_1 = require("fs-extra");
const posts_to_types_1 = __importDefault(require("./posts-to-types"));
jest.mock("fs-extra");
const mockReaddir = fs_extra_1.readdir;
const mockWriteFile = fs_extra_1.writeFile;
test.skip("#postsToTypes Convert a list of folders to a union type", () => __awaiter(void 0, void 0, void 0, function* () {
    mockReaddir.mockResolvedValueOnce(["a", "b", "c"]);
    process.env.SLUGS_LOCATION = "../slug.d.ts";
    process.env.POSTS_DIRECTORY = "dummy";
    yield (0, posts_to_types_1.default)();
    const types = 'type slug = "a" | "b" | "c";';
    expect(mockWriteFile).toHaveBeenCalledWith("../slug.d.ts", types);
}));
//# sourceMappingURL=posts-to-types.test.js.map