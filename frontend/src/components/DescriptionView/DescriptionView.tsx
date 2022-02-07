import { useContext } from "react";
import { Link } from "react-router-dom";
import { programContext } from "../../contexts/program";
import "./DescriptionView.scss";

type props = {
  performance: postedViewPerformance;
};

export default function DescriptionView({ performance }: props) {
  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[performance.postSlug];
  const path = post?.path || "";
  const title = post.label?.short || post.label?.full || "";

  return (
    <p>
      {" "}
      {performance.userId} read <Link to={path}>{title}</Link>.{" "}
    </p>
  );
}
