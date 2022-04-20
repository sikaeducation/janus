"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const posts_to_types_1 = __importDefault(require("./posts-to-types"));
dotenv_1.default.config();
(0, posts_to_types_1.default)().then(() => {
    // eslint-disable-next-line
    console.log("Updated slugs");
});
//# sourceMappingURL=generate-slugs.js.map