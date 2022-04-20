import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CurriculumViewer from "./CurriculumViewer";
import ProgramViewer from "./ProgramViewer";
import AppMissing from "./AppMissing";
import AppLoading from "./AppLoading";
import AppError from "./AppError";
import PerformanceViewer from "./PerformanceViewer";
import { toastContext } from "../contexts/toast";

import ToastNotification from "../components/ToastNotification";
import { programContext } from "../contexts/program";
import AppInbox from "./AppInbox";
import ProgressViewer from "./ProgressViewer";
import AppEvaluator from "./AppEvaluator";
import EvaluationViewer from "./EvaluationViewer";

export default function AuthenticatedRoutes() {
  const { toasts } = useContext(toastContext);
  const { program, isError, isLoading } = useContext(programContext);
  const { user } = useAuth0();
  const showToastNotification = toasts.length > 0;

  return (
    <>
      {isError && !isLoading && <AppError />}
      {isLoading ? (
        <AppLoading />
      ) : (
        <Routes>
          <Route path="/loading" element={<AppLoading />} />
          <Route path="/error" element={<AppError />} />
          <Route path="/404" element={<AppMissing />} />
          {program ? (
            <>
              <Route path="/inbox" element={<AppInbox />} />
              <Route path="/progress" element={<ProgressViewer />} />
              <Route path="/activity" element={<PerformanceViewer />} />
              <Route path="/evaluator" element={<AppEvaluator user={user} />} />
              <Route path="/evaluations" element={<EvaluationViewer />} />
              <Route
                path="/program-viewer"
                element={<ProgramViewer program={program} />}
              />
              <Route
                path="*"
                element={<CurriculumViewer program={program} />}
              />
            </>
          ) : (
            <Route path="*" element={<AppLoading />} />
          )}
        </Routes>
      )}
      {showToastNotification ? <ToastNotification /> : null}
    </>
  );
}
