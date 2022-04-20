"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const dotenv_1 = __importDefault(require("dotenv"));
const _1_1 = __importDefault(require("../data/raw-programs/1"));
const prepare_program_1 = __importDefault(require("./prepare-program"));
dotenv_1.default.config();
try {
    if (!process.env.DEHYDRATED_PROGRAM_DIRECTORY)
        throw new Error("Environment variable DEHYDRATED_PROGRAM_DIRECTORY must be defined");
    const program = (0, prepare_program_1.default)(_1_1.default);
    if (program instanceof Error)
        throw new Error(program.message);
    (0, fs_extra_1.writeJSON)(`${process.env.DEHYDRATED_PROGRAM_DIRECTORY}/1.json`, program).then(() => {
        // eslint-disable-next-line
        console.log("Wrote dehydrated program 1.json");
    });
}
catch (error) {
    if (error instanceof Error) {
        // eslint-disable-next-line
        console.error(error.message);
    }
    else {
        // eslint-disable-next-line
        console.error("Unknown error");
    }
}
//# sourceMappingURL=prepare-1.js.map