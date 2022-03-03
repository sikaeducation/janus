/* eslint react/destructuring-assignment: "off", react/no-unstable-nested-components: "off", react/no-children-prop: "off", react/jsx-props-no-spreading: "off" */

import "./AppContent.scss";
import ReactMarkdown from "react-markdown";
import frontmatter from "remark-frontmatter";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as style } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import { ComponentPropsWithoutRef, useContext } from "react";
import remarkUnwrapImages from "remark-unwrap-images";
import { last } from "lodash/fp";
import classNames from "classnames";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { performanceContext } from "../../contexts/performance";
import useIndicator from "../../hooks/use-indicator";
import { programContext } from "../../contexts/program";

type props = {
  content: string;
  isContained?: boolean;
  className?: string;
};

export default function AppContent({
  content,
  isContained,
  className = "",
}: props) {
  const {
    performancesWithEvaluations,
    lastQuestionPerformancesBySlugByLearnerByQuestion,
  } = useContext(performanceContext);
  const { postsBySlug } = useContext(programContext);
  const { user } = useAuth0();
  const getIndicator = useIndicator();
  return (
    <article
      className={classNames({
        AppContent: true,
        contained: isContained,
        [className]: true,
      })}
    >
      <ReactMarkdown
        children={content}
        remarkPlugins={[
          gfm,
          remarkUnwrapImages,
          [frontmatter, { type: "yaml", marker: "-" }],
        ]}
        components={{
          img: ({ src, alt }: ComponentPropsWithoutRef<"img">) => {
            return (
              <a href={src} target="_BLANK" rel="noopener noreferrer">
                <img src={src} alt={alt} />
              </a>
            );
          },
          a: ({ children, href }: ComponentPropsWithoutRef<"a">) => {
            const isExternal =
              href?.match(/^(https?:)?\/\//) || href?.match(/^mailto:/);
            if (isExternal) {
              return (
                <>
                  <a href={href} target="blank" rel="noreferrer">
                    {children}
                  </a>
                  &nbsp;
                  <FontAwesomeIcon
                    className="external-link-icon"
                    icon={faExternalLinkAlt}
                  />
                </>
              );
            }

            const slug = last(href?.split("/")) || "";
            const post = postsBySlug[slug || ""];
            const lastStandardQuestionPerformance = last(
              performancesWithEvaluations.filter(
                (performance) => performance.postSlug === slug
              )
            );
            const lastQuestionPerformances =
              lastQuestionPerformancesBySlugByLearnerByQuestion[slug]?.[
                user?.email || ""
              ];
            const lastPerformance =
              post?.type === "questions" && lastQuestionPerformances
                ? {
                    type: "questions",
                    postSlug: slug,
                    userId: user?.email || "",
                  }
                : lastStandardQuestionPerformance;

            return (
              <>
                <Link className="internal-link" to={href || ""}>
                  {children}
                </Link>
                {lastPerformance &&
                  getIndicator(lastPerformance as postedPerformance)}
              </>
            );
          },
          code: ({
            inline,
            className: elementClassName,
            children,
            ...props
          }) => {
            const match = /language-(\w+)/.exec(elementClassName || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={style}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={elementClassName} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </article>
  );
}
