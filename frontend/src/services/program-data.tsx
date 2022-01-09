import { useEffect, useState } from "react";

function useProgram(id: number) {
  const [program, setProgram] = useState({});
  useEffect(() => {
    const apiBaseUrl = "http://backend";
    fetch(`${apiBaseUrl}/programs/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setProgram(response.program);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [id]);

  return { program };
}

export default useProgram;
