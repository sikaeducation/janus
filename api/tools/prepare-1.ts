import { writeJSON } from "fs-extra";
import program1 from "../data/raw-programs/1";
import prepareProgram from "./prepare-program";

const program = prepareProgram(program1);
if (program instanceof Error) throw new Error(program.message);
writeJSON("../data/dehydrated-programs/1.json", program).then(() => {
  // eslint-disable-next-line
  console.log("Wrote raw program 1.json");
});
