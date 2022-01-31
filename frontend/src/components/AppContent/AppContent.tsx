/* eslint react/destructuring-assignment: "off", react/no-unstable-nested-components: "off", react/no-children-prop: "off", react/jsx-props-no-spreading: "off" */

import "./AppContent.scss";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as style } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import { ComponentPropsWithoutRef } from "react";
import remarkUnwrapImages from "remark-unwrap-images";
import { last } from "lodash/fp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircle as farCircle,
} from "@fortawesome/free-solid-svg-icons";

function getPerformanceIndicator(performance: postedPerformance) {
  switch (performance.payload.type) {
    case "topic-view": {
      const indicators = {
        1: <FontAwesomeIcon icon={faCircle} size="xs" className="failure" />,
        2: <FontAwesomeIcon icon={faCircle} size="xs" className="warning" />,
        3: <FontAwesomeIcon icon={faCircle} size="xs" className="success" />,
      };
      const { confidenceLevel } = (performance as postedTopicViewPerformance)
        .payload;
      return indicators[confidenceLevel];
    }
    case "exercise-submission": {
      const indicators: Record<string, JSX.Element> = {
        score: (
          <FontAwesomeIcon icon={faCircle} size="xs" className="failure" />
        ),
        default: (
          <FontAwesomeIcon icon={farCircle} size="xs" className="warning" />
        ),
      };
      const { url } = (performance as postedExerciseSubmissionPerformance)
        .payload;
      return indicators[url] || indicators.default;
    }
    default: {
      return null;
    }
  }
}

type props = {
  performances: postedPerformance[];
  content: string;
};

export default function AppContent({ content, performances }: props) {
  return (
    <article className="AppContent">
      <ReactMarkdown
        children={content}
        remarkPlugins={[gfm, remarkUnwrapImages]}
        components={{
          a: ({ children, href }: ComponentPropsWithoutRef<"a">) => {
            const isExternal = href?.match(/^(https?:)?\/\//);
            const slug = !isExternal && last(href?.split("/"));
            const currentPerformances = performances.filter(
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
