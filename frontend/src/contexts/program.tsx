import { useState, createContext, useEffect } from "react";

export const programContext = createContext<{
  program: hydratedProgram | null;
  setProgram: (program: hydratedProgram) => void;
}>(
  {} as unknown as {
    program: hydratedProgram | null;
    setProgram: (program: hydratedProgram) => void;
  }
);

type props = { children: JSX.Element };
export function ProgramProvider({ children }: props) {
  const [program, setProgram] = useState<hydratedProgram | null>(null);
  const id = 1; // Hard-coded
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
      }}
    >
      {children}
    </programContext.Provider>
  );
}
