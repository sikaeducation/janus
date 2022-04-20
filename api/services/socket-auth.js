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
/* eslint @typescript-eslint/no-explicit-any: "off" */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
function socketAuth(socket, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = socket.handshake.auth;
        const { verify } = jsonwebtoken_1.default;
        const client = (0, jwks_rsa_1.default)({
            jwksUri: process.env.AUTH_KEY_URL || "",
        });
        const getKey = (header, callback) => {
            client.getSigningKey(header.kid, (error, key) => {
                const signingKey = key.getPublicKey();
                callback(error, signingKey);
            });
        };
        verify(token, getKey, (error, decodedJwt) => {
            // eslint-disable-next-line
            socket.email = decodedJwt["https://sikaeducation.com/email"];
            // eslint-disable-next-line
            socket.role = decodedJwt["https://sikaeducation.com/role"];
            next(error);
        });
    });
}
exports.default = socketAuth;
//# sourceMappingURL=socket-auth.js.map