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
exports.socketServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const programs_1 = __importDefault(require("./programs"));
const socket_auth_1 = __importDefault(require("../services/socket-auth"));
const performances_1 = __importDefault(require("./performances"));
const prompts_1 = __importDefault(require("./prompts"));
const Performance_1 = __importDefault(require("../data/models/Performance"));
const Evaluation_1 = __importDefault(require("../data/models/Evaluation"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
if (app.get("env") !== "test")
    app.use((0, morgan_1.default)("tiny"));
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
exports.socketServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(exports.socketServer, {
    cors: {
        origin: process.env.CLIENT_ORIGIN,
    },
});
io.use(socket_auth_1.default);
io.on("connection", (socket) => {
    if (socket.role === "coach") {
        socket.join("coaches");
    }
    socket.join(socket.email || "");
});
io.on("connection", (0, performances_1.default)(io));
io.on("connection", (0, prompts_1.default)(io));
app.use("/programs", programs_1.default);
app.get("/", (request, response) => {
    response.status(200).json();
});
app.delete("/performances/:postSlug", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const performances = yield Performance_1.default.query().select("id").where({
        postSlug: request.params.postSlug,
    });
    const performanceIds = performances.map((performance) => performance.id);
    yield Evaluation_1.default.query().delete().whereIn("performanceId", performanceIds);
    yield Performance_1.default.query().delete().whereIn("id", performanceIds);
    response.sendStatus(204);
}));
// eslint-disable-next-line
app.get("/error", (request, response) => {
    throw new Error();
});
app.use(
// eslint-disable-next-line
(error, request, response, next) => {
    // eslint-disable-next-line
    console.error(error.message);
    response.status(500).json({
        error: "There was a problem with this request",
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map