"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./routes/app");
const PORT = process.env.PORT || 80;
app_1.socketServer.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`App is listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map