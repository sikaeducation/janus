import dotenv from "dotenv";
import app from "./routes/app";

dotenv.config();

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App is listening on ${PORT}`);
});
