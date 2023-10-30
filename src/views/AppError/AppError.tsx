import "./AppError.scss";
import { Link } from "react-router-dom";

export default function AppError() {
	return (
		<div className="AppError">
			<h1>Something weird happened.</h1>
			<Link to="/error">Go back home</Link>
		</div>
	);
}
