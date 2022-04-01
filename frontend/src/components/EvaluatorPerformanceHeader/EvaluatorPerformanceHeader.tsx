import "./EvaluatorPerformanceHeader.scss";

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
        <th>&nbsp;</th>
        <th className="evaluate-all">
          <button
            className="rejected"
            type="button"
            onClick={() => setAll("rejected")}
          >
            Reject
          </button>
        </th>
        <th className="evaluate-all">
          <button
            className="accepted"
            type="button"
            onClick={() => setAll("accepted")}
          >
            Accept
          </button>
        </th>
      </tr>
    </thead>
  );
}
