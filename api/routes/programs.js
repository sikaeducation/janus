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
const express_1 = __importDefault(require("express"));
const program_1 = require("../services/program");
const github_1 = require("../services/github");
const router = express_1.default.Router();
router.get("/:programId/current-version", (request, response) => {
    const { programId } = request.params;
    try {
        const version = (0, program_1.getProgramVersion)(+programId);
        response.json({ version });
    }
    catch (_a) {
        response.status(400).json({});
    }
});
router.get("/:programId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // response.json({ program: getProgram() });
    const { programId } = request.params;
    try {
        const programExists = (0, program_1.checkProgram)(+programId);
        const program = programExists
            ? (0, program_1.readProgram)(+programId)
            : yield (0, program_1.buildProgram)(+programId);
        response.json({ program });
    }
    catch (error) {
        // eslint-disable-next-line
        if (error instanceof Error)
            console.error(error.message);
        response.status(500).json({ error: `Couldn't get program ${programId}` });
    }
}));
router.post("/build", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = process.env.NODE_ENV !== "production" || (0, github_1.verifyWebHook)(request);
    if (isValid) {
        // eslint-disable-next-line
        console.log("Building");
        yield (0, program_1.buildAllPrograms)();
        response.status(200).send();
    }
    else {
        response.status(401).send();
    }
}));
exports.default = router;
//# sourceMappingURL=programs.js.map