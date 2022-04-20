"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let currentBroadcast = null;
const startInboxPrompt = (socket, io) => (broadcast) => {
    if (socket.role === "coach") {
        // eslint-disable-next-line
        currentBroadcast = broadcast;
        io.emit("new-inbox-prompt", broadcast);
    }
};
const endInboxPrompt = (socket, io) => () => {
    if (socket.role === "coach") {
        // eslint-disable-next-line
        currentBroadcast = null;
        io.emit("end-inbox-prompt");
    }
};
const getInboxPrompt = (socket) => () => {
    socket.emit("new-inbox-prompt", currentBroadcast);
};
const promptHandlers = (io) => (socket) => {
    socket.on("start-inbox-prompt", startInboxPrompt(socket, io));
    socket.on("end-inbox-prompt", endInboxPrompt(socket, io));
    socket.on("get-inbox-prompt", getInboxPrompt(socket));
};
exports.default = promptHandlers;
//# sourceMappingURL=prompts.js.map