import { Routes, Route } from "react-router-dom";
import AppMissing from "./AppMissing";
import AppLoading from "./AppLoading";
import AppError from "./AppError";

import ActivityManagerView from "./ActivityManagerView";

export default function AuthenticatedRoutes() {
  return (
    <>
      <Routes>
        <Route path="/loading" element={<AppLoading />} />
        <Route path="/error" element={<AppError />} />
        <Route path="/404" element={<AppMissing />} />
        <Route path="/activity-manager" element={<ActivityManagerView />} />
        <Route path="*" element={<p>Home page</p>} />
      </Routes>
    </>
  );
}
