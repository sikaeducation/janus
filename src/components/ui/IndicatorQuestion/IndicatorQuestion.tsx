import './IndicatorQuestion.scss';

type props = {
  rejected: number;
  pending: number;
  accepted: number;
};

export default function IndicatorQuestion({
  rejected,
  pending,
  accepted,
}: props) {
  return (
    <span className="IndicatorQuestion">
      {rejected > 0 && <span className="indicator failure">{rejected}</span>}
      {pending > 0 && <span className="indicator pending">{pending}</span>}
      {accepted > 0 && <span className="indicator success">{accepted}</span>}
    </span>
  );
}
