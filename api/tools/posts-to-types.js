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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
function postsToTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.POSTS_DIRECTORY)
            throw new Error("Environment variable POSTS_DIRECTORY must be defined");
        if (!process.env.SLUGS_LOCATION)
            throw new Error("Environment variable SLUGS_LOCATION must be defined");
        const directories = yield (0, fs_extra_1.readdir)(process.env.POSTS_DIRECTORY || "");
        const slugs = directories.map((directory) => `"${directory}"`).join(" | ");
        (0, fs_extra_1.writeFile)(process.env.SLUGS_LOCATION, `type slug = ${slugs};`);
    });
}
exports.default = postsToTypes;
//# sourceMappingURL=posts-to-types.js.map