import { socketServer } from "./routes/app";

const PORT = process.env.PORT || 80;
socketServer.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App is listening on ${PORT}`);
});
