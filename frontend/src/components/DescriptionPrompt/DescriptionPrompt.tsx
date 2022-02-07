import "./DescriptionPrompt.scss";

type props = {
  performance: postedPromptPerformance;
};

export default function DescriptionPrompt({ performance }: props) {
  return (
    <p className="DescriptionPrompt description">
      {performance.userId} answered a prompt.
    </p>
  );
}
