import data from "../data";

export default function getCurrentProgram() {
  const { program } = data; // Fetch or read from localStorage

  return program;
}
