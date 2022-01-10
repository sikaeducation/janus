import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppShell from "./views/AppShell";

import useProgram from "./services/program-data";

function App() {
  const program = useProgram(1);

  return (
    <Router>
      <Routes>
        <Route path="404" element={<p>Couldn&lsquo;t find that, sorry!</p>} />
        {program ? (
          <Route path="*" element={<AppShell program={program} />} />
        ) : (
          <Route path="*" element={<p>Loading...</p>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
