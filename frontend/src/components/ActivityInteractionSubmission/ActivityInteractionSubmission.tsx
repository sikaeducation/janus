/* eslint react/destructuring-assignment: "off", react/no-unstable-nested-components: "off", react/no-children-prop: "off", react/jsx-props-no-spreading: "off" */
import { useState } from "react";
import { format } from "date-fns";
import "./ActivityInteractionSubmission.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import AppContent from "../AppContent";
import Button from "../ui/Button";

type props = {
  postPerformance: (performance: rawSubmissionPerformance) => void;
  userId: string;
  postSlug: string;
  performances: evaluatedSubmissionPerformance[];
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
    const statuses: Record<string, JSX.Element> = {
      accepted: (
        <span>
          was accepted{" "}
          <FontAwesomeIcon
            icon={faClipboardCheck}
            className="indicator success"
          />
        </span>
      ),
      rejected: (
        <span>
          was not accepted{" "}
          <FontAwesomeIcon
            icon={faClipboardCheck}
            className="indicator failure"
          />{" "}
        </span>
      ),
      submitted: (
        <span>
          has not been evaluated yet{" "}
          <FontAwesomeIcon icon={faClipboardCheck} className="indicator" />{" "}
        </span>
      ),
    };
    return statuses[status || "submitted"];
  };
  return (
    <div className="ActivityInteractionSubmission">
      {performances.length > 0 ? (
        <>
          <h2>Previous Submissions:</h2>
          <ul className="submissions">
            {performances.map((performance) => (
              <li key={performance.id}>
                <div
                  className={classNames({
                    "previous-submission ": true,
                    rejected: performance.evaluation?.status === "rejected",
                    accepted: performance.evaluation?.status === "accepted",
                    pending: !performance.evaluation?.status,
                  })}
                >
                  <a href={performance.payload.url}>
                    {formatDateTime(performance.createdAt)}
                  </a>
                  <p>
                    This submission{" "}
                    {getMessage(performance.evaluation?.status || "")}
                  </p>
                  {performance.evaluation?.feedback ? (
                    <AppContent content={performance.evaluation?.feedback} />
                  ) : null}
                </div>
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
          required
        />
        <Button submit type="primary">{`Submit${
          performances.length > 0 ? " another" : ""
        }`}</Button>
      </form>
    </div>
  );
}
