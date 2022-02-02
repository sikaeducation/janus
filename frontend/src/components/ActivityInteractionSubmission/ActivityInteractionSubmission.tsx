/* eslint react/destructuring-assignment: "off", react/no-unstable-nested-components: "off", react/no-children-prop: "off", react/jsx-props-no-spreading: "off" */
import { useState } from "react";
import { format } from "date-fns";
import "./ActivityInteractionSubmission.scss";
import remarkUnwrapImages from "remark-unwrap-images";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as style } from "react-syntax-highlighter/dist/esm/styles/prism";

type props = {
  postPerformance: (performance: rawSubmissionPerformance) => void;
  userId: string;
  postSlug: string;
  performances: (postedSubmissionPerformance & {
    evaluation?: postedEvaluation;
  })[];
};

export default function ActivityInteractionSubmission({
  userId,
  postSlug,
  performances,
  postPerformance,
}: props) {
  const [url, setUrl] = useState<string>("");
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    postPerformance({
      userId,
      postSlug,
      type: "submission",
      payload: {
        url,
      },
    });
    setUrl("");
  };
  const formatDateTime = (dateTime: string) =>
    format(new Date(dateTime), "M/d/yy: p");
  const getMessage = (status: string) => {
    const statuses: Record<string, string> = {
      accepted: "accepted",
      rejected: "rejected",
    };
    return statuses[status] || "submitted";
  };
  return (
    <div className="ActivityInteractionSubmission">
      {performances.length ? (
        <>
          <p>Previous Submissions:</p>
          <ul className="submissions">
            {performances.map((performance) => (
              <li key={performance.id}>
                <a href={performance.payload.url}>
                  {formatDateTime(performance.createdAt)}
                </a>
                {performance.evaluation ? (
                  <div>
                    <p>
                      This submission was{" "}
                      {getMessage(performance.evaluation.status)}.
                    </p>
                    <ReactMarkdown
                      children={performance.evaluation.feedback}
                      remarkPlugins={[gfm, remarkUnwrapImages]}
                      components={{
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
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="url-input">Submission URL</label>
        <input
          id="url-input"
          name="url-input"
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
