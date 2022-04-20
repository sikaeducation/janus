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
exports.seed = void 0;
// eslint-disable-next-line import/prefer-default-export
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex("evaluation").del();
        yield knex("performance").del();
        yield knex("performance").insert([
            {
                type: "view",
                userId: "kyle.coberly@gmail.com",
                postSlug: "cli-intro",
                payload: {
                    confidenceLevel: 2,
                },
            },
            {
                type: "submission",
                userId: "kyle.coberly@gmail.com",
                postSlug: "exercise-cli-exercise-1",
                payload: {
                    url: "http://google.com",
                },
            },
        ]);
    });
}
exports.seed = seed;
//# sourceMappingURL=performances.js.map