import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import CurriculumViewer from "./CurriculumViewer";
import ProgramViewer from "./ProgramViewer";
import AppMissing from "./AppMissing";
import AppLoading from "./AppLoading";
import AppError from "./AppError";
import InstructorInbox from "./InstructorInbox";
import { toastContext } from "../contexts/toast";

import { useProgram } from "../services/program";
import ToastNotification from "../components/ToastNotification";

export default function AuthenticatedRoutes() {
  const { toasts } = useContext(toastContext);
  const program = useProgram(1);
  const showToastNotification = toasts.length > 0;

  return (
    <>
      <Routes>
        <Route path="/loading" element={<AppLoading />} />
        <Route path="/error" element={<AppError />} />
        <Route path="/404" element={<AppMissing />} />
        {program ? (
          <>
            <Route path="/inbox" element={<InstructorInbox />} />
            <Route
              path="/program-viewer"
              element={<ProgramViewer program={program} />}
            />
            <Route path="*" element={<CurriculumViewer program={program} />} />
          </>
        ) : (
          <Route path="*" element={<AppLoading />} />
        )}
      </Routes>
      {showToastNotification ? <ToastNotification /> : null}
    </>
  );
}
