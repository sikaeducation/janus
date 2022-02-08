/* eslint react/destructuring-assignment: "off", react/no-unstable-nested-components: "off", react/no-children-prop: "off", react/jsx-props-no-spreading: "off" */

import "./AppContent.scss";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as style } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import { ComponentPropsWithoutRef, useContext } from "react";
import remarkUnwrapImages from "remark-unwrap-images";
import { last } from "lodash/fp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { performanceContext } from "../../contexts/performance";

function getPerformanceIndicator(performance: evaluatedPerformance) {
  switch (performance.type) {
    case "view": {
      const indicators = {
        1: (
          <FontAwesomeIcon
            icon={faCheck}
            size="xs"
            className="indicator failure"
            title="You read this and indicated that it was unclear to you"
          />
        ),
        2: (
          <FontAwesomeIcon
            icon={faCheck}
            size="xs"
            className="indicator"
            title="You read this and indicated that it was clear to you"
          />
        ),
        3: (
          <FontAwesomeIcon
            icon={faCheck}
            size="xs"
            className="indicator success"
            title="You read this and indicated that you were confident about it."
          />
        ),
      };
      const { confidenceLevel } = performance.payload;
      return indicators[confidenceLevel];
    }
    case "submission": {
      const indicators: Record<string, JSX.Element> = {
        rejected: (
          <FontAwesomeIcon
            icon={faClipboardCheck}
            size="xs"
            className="indicator failure"
            title="Your latest submission needs more work"
          />
        ),
        accepted: (
          <FontAwesomeIcon
            icon={faClipboardCheck}
            size="xs"
            className="indicator success"
            title="Your latest submission was accepted!"
          />
        ),
        submitted: (
          <FontAwesomeIcon
            icon={faClipboardCheck}
            size="xs"
            className="indicator submitted"
            title="Your latest submission is waiting to be graded"
          />
        ),
      };
      const status =
        (performance as evaluatedSubmissionPerformance)?.evaluation?.status ||
        "";
      return indicators[status] || indicators.submitted;
    }
    default: {
      return null;
    }
  }
}

type props = {
  content: string;
  wrapperClassName?: string;
};

export default function AppContent({ content, wrapperClassName }: props) {
  const { performancesWithEvaluations } = useContext(performanceContext);
  return (
    <article className={`AppContent ${wrapperClassName || null}`}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[gfm, remarkUnwrapImages]}
        components={{
          a: ({ children, href }: ComponentPropsWithoutRef<"a">) => {
            const isExternal = href?.match(/^(https?:)?\/\//);
            const slug = !isExternal && last(href?.split("/"));
            const currentPerformances = performancesWithEvaluations.filter(
              (performance) => performance.postSlug === slug
            );
            const lastPerformance = last(currentPerformances);
            return isExternal ? (
              <a href={href} target="blank" rel="noreferrer">
                {children}
              </a>
            ) : (
              <>
                <Link className="internal-link" to={href || ""}>
                  {children}
                </Link>
                {lastPerformance
                  ? getPerformanceIndicator(lastPerformance)
                  : null}
              </>
            );
          },
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={style}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </article>
  );
}
