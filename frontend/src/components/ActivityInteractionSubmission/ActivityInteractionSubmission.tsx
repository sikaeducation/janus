import { useState } from "react";
import { format } from "date-fns";
import "./ActivityInteractionSubmission.scss";

type props = {
  postPerformance: (performance: rawSubmissionPerformance) => void;
  userId: string;
  postSlug: string;
  performances: postedSubmissionPerformance[];
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
  return (
    <div className="ActivityInteractionSubmission">
      {performances.length ? (
        <>
          <p>Previous Submissions:</p>
          <ul className="submissions">
            {performances.map(({ id, createdAt, payload }) => (
              <li key={id}>
                <a href={payload.url}>{formatDateTime(createdAt)}</a>
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
