import "./Markdown.scss";
import ReactMarkdown from "react-markdown";
import frontmatter from "remark-frontmatter";
import gfm from "remark-gfm";
import { useContext } from "react";
import remarkUnwrapImages from "remark-unwrap-images";
import classNames from "classnames";
import { useAuth0 } from "@auth0/auth0-react";
import { performanceContext } from "../../../contexts/performance";
import useIndicator from "../../../hooks/use-indicator";
import { programContext } from "../../../contexts/program";
import { addLinkToImage, formatCode, formatLinks } from "./markdown-utilities";

type props = {
  content: string;
  className?: string;
};

export default function AppContent({ content, className = "" }: props) {
  const {
    lastQuestionPerformancesBySlugByLearnerByQuestion,
    lastPerformanceBySlugByLearner,
  } = useContext(performanceContext);
  const { postsBySlug } = useContext(programContext);
  const { user } = useAuth0();
  const getIndicator = useIndicator();
  return (
    <article
      className={classNames({
        AppContent: true,
        [className]: true,
      })}
    >
      <ReactMarkdown
        remarkPlugins={[
          gfm,
          remarkUnwrapImages,
          [frontmatter, { type: "yaml", marker: "-" }],
        ]}
        components={{
          img: addLinkToImage,
          a: formatLinks({
            postsBySlug,
            user,
            lastPerformanceBySlugByLearner,
            lastQuestionPerformancesBySlugByLearnerByQuestion,
            getIndicator,
          }),
          code: formatCode,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
