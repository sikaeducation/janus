import {
	useContext, useState,
} from "react";
import {
	performanceContext,
} from "../../contexts/performance";
import SubmissionEvaluationForm from "../SubmissionEvaluationForm";
import "./LearnerSubmissionEvaluable.scss";

type props = {
  performance: evaluatedPerformance;
};

export default function LearnerSubmissionEvaluable({
	performance,
}: props){
	const [
		showForm,
		setShowForm,
	] = useState(true);
	const {
		getPreviousEvaluations,
	} = useContext(performanceContext);

	const previousPerformances = getPreviousEvaluations(performance);

	return showForm
		? (
    <SubmissionEvaluationForm
      performance={performance}
      previousPerformances={previousPerformances}
      cancel={() => setShowForm(false)}
    />
		)
		: (
    <div className="toggle-evaluation-form">
      <button type="button" onClick={() => setShowForm(true)}>
        Evaluate
      </button>
    </div>
		);
}
