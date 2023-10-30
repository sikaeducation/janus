import { Routes, Route } from "react-router-dom";
import AppMissing from "@/views/AppMissing";
import AppLoading from "@/views/AppLoading";
import AppError from "@/views/AppError";

import ActivityManagerView from "@/views/ActivityManagerView";

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
