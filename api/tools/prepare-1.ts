import { writeJSON } from "fs-extra";
import dotenv from "dotenv";
import program1 from "../data/raw-programs/1";
import prepareProgram from "./prepare-program";

dotenv.config();

if (!process.env.DEHYDRATED_PROGRAM_DIRECTORY)
  throw new Error(
    "Environment variable DEHYDRATED_PROGRAM_DIRECTORY must be defined"
  );

const program = prepareProgram(program1);
if (program instanceof Error) throw new Error(program.message);
writeJSON(`${process.env.DEHYDRATED_PROGRAM_DIRECTORY}/1.json`, program).then(
  () => {
    // eslint-disable-next-line
  console.log("Wrote dehydrated program 1.json");
  }
);
