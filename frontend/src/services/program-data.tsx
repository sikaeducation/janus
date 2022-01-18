import { useEffect, useState } from "react";

function useProgram(id: number): programData | null {
  const [program, setProgram] = useState<programData | null>(null);
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

  return program;
}

export default useProgram;
