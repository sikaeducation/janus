import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppShell from "./views/AppShell";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AppShell />} />
      </Routes>
    </Router>
  );
}

export default App;
