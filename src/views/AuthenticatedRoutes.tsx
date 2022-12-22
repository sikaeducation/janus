import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AppMissing from "./AppMissing";
import AppLoading from "./AppLoading";
import AppError from "./AppError";
import { toastContext } from "../contexts/toast";

import Toast from "../components/ui/Toast";
import Notification from "../components/AppNotification";
import ActivityManagerView from "./ActivityManagerView";

export default function AuthenticatedRoutes() {
  const { toasts } = useContext(toastContext);
  const showToastNotification = toasts.length > 0;

  return (
    <>
      <Routes>
        <Route path="/loading" element={<AppLoading />} />
        <Route path="/error" element={<AppError />} />
        <Route path="/404" element={<AppMissing />} />
        <Route path="/activity-manager" element={<ActivityManagerView />} />
        <Route path="*" element={<p>Home page</p>} />
      </Routes>
      {showToastNotification ? (
        <Toast>
          <Notification />
        </Toast>
      ) : null}
    </>
  );
}
