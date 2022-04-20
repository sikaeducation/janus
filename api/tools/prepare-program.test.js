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
const prepare_program_1 = __importDefault(require("./prepare-program"));
const sampleRawProgram = {
    id: 1,
    label: "Program",
    root: {
        type: "root",
        label: {
            full: "Full",
            short: "Short",
            tiny: "1",
        },
        path: "/",
        slug: "ford-full-stack",
        children: ["unit-websites", "unit-web-apps"],
    },
    posts: [
        {
            type: "unit",
            label: {
                full: "Full",
                short: "Short",
                tiny: "1",
            },
            path: "/unit-websites",
            slug: "unit-websites",
            children: ["html-intro"],
        },
        {
            type: "unit",
            label: {
                full: "Web Apps",
                short: "Web apps",
                tiny: "2",
            },
            path: "/unit-web-apps",
            slug: "unit-web-apps",
            children: [],
        },
        {
            type: "topic",
            label: {
                full: "Intro to HTML",
                short: "HTML intro",
                tiny: "",
            },
            path: "/unit-websites/html-intro",
            slug: "html-intro",
            children: [],
        },
    ],
};
test("#prepareProgram converts a raw program to a hydrated program", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, prepare_program_1.default)(sampleRawProgram);
    expect(result).toEqual({
        id: 1,
        label: "Program",
        root: {
            type: "root",
            label: {
                full: "Full",
                short: "Short",
                tiny: "1",
            },
            path: "/",
            slug: "ford-full-stack",
            children: ["unit-websites", "unit-web-apps"],
        },
        posts: [
            {
                type: "unit",
                label: {
                    full: "Full",
                    short: "Short",
                    tiny: "1",
                },
                path: "/unit-websites",
                slug: "unit-websites",
                children: ["html-intro"],
            },
            {
                type: "unit",
                label: {
                    full: "Web Apps",
                    short: "Web apps",
                    tiny: "2",
                },
                path: "/unit-web-apps",
                slug: "unit-web-apps",
                children: [],
            },
            {
                type: "topic",
                label: {
                    full: "Intro to HTML",
                    short: "HTML intro",
                    tiny: "",
                },
                path: "/unit-websites/html-intro",
                slug: "html-intro",
                children: [],
            },
        ],
    });
}));
test("#prepareProgram requires the root post to have children", () => __awaiter(void 0, void 0, void 0, function* () {
    const rootPostWithoutChildren = {
        id: 1,
        label: "Program",
        root: {
            type: "root",
            label: {
                full: "Full",
                short: "Short",
                tiny: "1",
            },
            path: "/",
            slug: "ford-full-stack",
            children: [],
        },
        posts: [],
    };
    const result = (0, prepare_program_1.default)(rootPostWithoutChildren);
    expect(result).toBeInstanceOf(Error);
}));
test("#prepareProgram rejects programs with too many posts", () => __awaiter(void 0, void 0, void 0, function* () {
    const programWithTooManyPosts = {
        id: 1,
        label: "Program",
        root: {
            type: "root",
            label: {
                full: "Full",
                short: "Short",
                tiny: "1",
            },
            path: "/",
            slug: "ford-full-stack",
            children: ["html-intro"],
        },
        posts: [
            {
                type: "topic",
                label: {
                    full: "Full",
                    short: "Short",
                    tiny: "1",
                },
                path: "/html-intro",
                slug: "html-intro",
                children: [],
            },
            {
                type: "topic",
                label: {
                    full: "Full",
                    short: "Short",
                    tiny: "1",
                },
                path: "/html-div-and-span",
                slug: "html-div-and-span",
                children: [],
            },
        ],
    };
    const result = (0, prepare_program_1.default)(programWithTooManyPosts);
    expect(result).toBeInstanceOf(Error);
}));
test("#prepareProgram rejects programs with not enough posts", () => __awaiter(void 0, void 0, void 0, function* () {
    const programWithNotEnoughPosts = {
        id: 1,
        label: "Program",
        root: {
            type: "root",
            label: {
                full: "Full",
                short: "Short",
                tiny: "1",
            },
            path: "/",
            slug: "ford-full-stack",
            children: ["html-intro"],
        },
        posts: [
            {
                type: "topic",
                label: {
                    full: "Full",
                    short: "Short",
                    tiny: "1",
                },
                path: "/html-intro",
                slug: "html-intro",
                children: ["html-div-and-span"],
            },
        ],
    };
    const result = (0, prepare_program_1.default)(programWithNotEnoughPosts);
    expect(result).toBeInstanceOf(Error);
}));
//# sourceMappingURL=prepare-program.test.js.map