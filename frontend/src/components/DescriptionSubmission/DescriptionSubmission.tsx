import { useContext } from "react";
import { programContext } from "../../contexts/program";
import "./DescriptionSubmission.scss";

type props = {
  performance: evaluatedSubmissionPerformance;
};

export default function DescriptionSubmission({ performance }: props) {
  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[performance.postSlug];
  const title = post.label?.short || post.label?.full || "";

  return (
    <p>
      {performance.userId} submitted{" "}
      <a href={performance.payload.url}>{title}</a>.
    </p>
  );
}
