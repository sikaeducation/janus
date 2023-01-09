/* eslint-disable @typescript-eslint/no-explicit-any */

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { last } from "lodash/fp";
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { dracula as style } from "react-syntax-highlighter/dist/esm/styles/prism";
import Heading from "../Heading";

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

export function formatHeading(level: number) {
  return function _formatHeading({ children }: any) {
    switch (level) {
      case 1:
        return <Heading level={1}>{children}</Heading>;
      case 2:
        return <Heading level={2}>{children}</Heading>;
      case 3:
        return <Heading level={3}>{children}</Heading>;
      case 4:
        return <Heading level={4}>{children}</Heading>;
      default:
        return <Heading level={1}>{children}</Heading>;
    }
  };
}
