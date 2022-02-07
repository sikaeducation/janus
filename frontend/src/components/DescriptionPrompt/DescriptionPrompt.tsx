import "./DescriptionPrompt.scss";

type props = {
  performance: evaluatedSubmissionPerformance;
};

export default function DescriptionPrompt({ performance }: props) {
  return <p>{performance.userId} answered a prompt.</p>;
}
