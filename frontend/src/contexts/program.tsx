import { keyBy } from "lodash/fp";
import { useState, createContext, useEffect } from "react";

export const programContext = createContext<{
  program: hydratedProgram | null;
  setProgram: (program: hydratedProgram) => void;
  postsBySlug: Record<string, hydratedPost>;
}>(
  {} as unknown as {
    program: hydratedProgram | null;
    setProgram: (program: hydratedProgram) => void;
    postsBySlug: Record<string, hydratedPost>;
  }
);

type props = { children: JSX.Element };
export function ProgramProvider({ children }: props) {
  const [program, setProgram] = useState<hydratedProgram>({
    id: 0,
    label: "",
    root: {
      type: "root",
      label: {
        full: "",
      },
      slug: "",
      children: [],
      path: "",
      content: "",
    },
    posts: [],
  });
  const id = 1; // Hard-coded
  const posts = [program.root, ...program.posts];
  const postsBySlug = keyBy<hydratedPost>("slug")(posts);
  useEffect(() => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiBaseUrl}/programs/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setProgram(response.program);
      })
      .catch((error) => {
        // eslint-disable-next-line
          console.error(error.message);
      });
  }, [id]);

  return (
    <programContext.Provider
      value={{
        program,
        setProgram,
        postsBySlug,
      }}
    >
      {children}
    </programContext.Provider>
  );
}
