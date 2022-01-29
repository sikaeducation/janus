import dotenv from "dotenv";
import postToTypes from "./posts-to-types";

dotenv.config();

postToTypes().then(() => {
  // eslint-disable-next-line
  console.log("Updated slugs");
});
