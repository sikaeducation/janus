/* eslint-disable @typescript-eslint/no-explicit-any */

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { last } from "lodash/fp";
import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { dracula as style } from "react-syntax-highlighter/dist/esm/styles/prism";

export function addLinkToImage({ src, alt }: ComponentPropsWithoutRef<"img">) {
  return (
    <a href={src} className="image-container" rel="noopener noreferrer">
      <img src={src} alt={alt} />
    </a>
  );
}

export function formatLinks({
  postsBySlug,
  user,
  lastPerformanceBySlugByLearner,
  lastQuestionPerformancesBySlugByLearnerByQuestion,
  getIndicator,
}: any) {
  return function _formatLinks({
    children,
    href,
  }: ComponentPropsWithoutRef<"a">) {
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

    const lastNonQuestionPerformance =
      slug &&
      user?.email &&
      lastPerformanceBySlugByLearner[slug]?.[user?.email || ""];

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
        : lastNonQuestionPerformance;

    return href ? (
      <>
        <Link className="internal-link" to={href || ""}>
          {children}
        </Link>
        {lastPerformance && getIndicator(lastPerformance as postedPerformance)}
      </>
    ) : (
      <a href="https://sikaeducation.com">{children}</a>
    );
  };
}

export function formatCode({
  inline,
  className: elementClassName,
  children,
}: any) {
  const match = /language-(\w+)/.exec(elementClassName || "");
  return !inline && match ? (
    <SyntaxHighlighter style={style} language={match[1]} PreTag="div">
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={elementClassName}>{children}</code>
  );
}
