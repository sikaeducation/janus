import { useContext, useState } from "react";
import { performanceContext } from "../../contexts/performance";
import QuestionEvaluationForm from "../QuestionEvaluationForm";
import "./LearnerQuestionEvaluable.scss";

type props = {
  performance: evaluatedQuestionPerformance;
};

export default function LearnerQuestionEvaluable({ performance }: props) {
  const [showForm, setShowForm] = useState(false);
  const { getPreviousEvaluations } = useContext(performanceContext);

  const previousPerformances = getPreviousEvaluations(
    performance
  ) as unknown as evaluatedQuestionPerformance[];

  return showForm ? (
    <QuestionEvaluationForm
      performance={performance}
      previousPerformances={previousPerformances}
      cancel={() => setShowForm(false)}
    />
  ) : (
    <div className="toggle-evaluation-form">
      <button type="button" onClick={() => setShowForm(true)}>
        Evaluate
      </button>
    </div>
  );
}
