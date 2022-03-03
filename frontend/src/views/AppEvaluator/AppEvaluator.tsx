import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Gravatar from "react-gravatar";
import AppContent from "../../components/AppContent";
import "./AppEvaluator.scss";

export default function AppEvaluator() {
  const answer = false;

  return (
    <div className="AppEvaluator">
      <h2>Evaluator</h2>
      <form>
        <select>
          <option disabled>Select an activity to evaluate</option>
        </select>
      </form>
      <div className="question-details">
        <AppContent className="prompt" content="" />
        {answer && <AppContent className="answer" content="" />}
      </div>
      <form>
        <table className="evaluator-performances">
          <thead>
            <tr>
              <th>Learner</th>
              <th>Time</th>
              <th>Submission</th>
              <th>Resubmission?</th>
              <th>Feedback</th>
              <th>Reject</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            <tr className="evaluator-performance">
              <td className="avatar">
                <Gravatar email="" size={60} title="Learner's name" />
              </td>
              <td className="submission-time">
                <time>12:30</time>
              </td>
              <td className="submission">
                <AppContent content="" />
              </td>
              <td className="has-previous-feedback">
                <FontAwesomeIcon icon={faCheck} />
              </td>
              <td className="feedback">
                <input />
              </td>
              <td className="evaluation-reject">
                <input type="checkbox" value="reject" />
              </td>
              <td className="evaluation-accept">
                <input type="checkbox" value="accept" />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit All</button>
      </form>
    </div>
  );
}
