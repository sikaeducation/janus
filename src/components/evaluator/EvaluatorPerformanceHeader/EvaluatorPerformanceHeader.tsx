import './EvaluatorPerformanceHeader.scss';

type props = {
  setAll: (status: string) => void;
};

export default function EvaluatorPerformanceHeader({ setAll }: props) {
  return (
    <thead className="EvaluatorPerformanceHeader">
      <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th id="feedback-label">Feedback</th>
        <th className="evaluate-all">
          <button
            className="rejected"
            id="rejected"
            type="button"
            onClick={() => setAll('rejected')}
          >
            Reject
          </button>
        </th>
        <th className="evaluate-all">
          <button
            className="accepted"
            id="accepted"
            type="button"
            onClick={() => setAll('accepted')}
          >
            Accept
          </button>
        </th>
      </tr>
    </thead>
  );
}
