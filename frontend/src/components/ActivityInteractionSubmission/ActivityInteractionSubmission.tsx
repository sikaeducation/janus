import { useState } from "react";
import "./ActivityInteractionSubmission.scss";

type props = {
  postPerformance: (performance: rawExerciseSubmissionPerformance) => void;
  userId: string;
  postSlug: string;
  performances: postedPerformance[];
};

export default function ActivityInteractionSubmission({
  userId,
  postSlug,
  performances,
  postPerformance,
}: props) {
  const [url, setUrl] = useState<string>("");
  const handleSubmit = (event: React.SyntheticEvent) => () => {
    event.preventDefault();
    postPerformance({
      userId,
      postSlug,
      payload: {
        type: "submission",
        url,
      },
    });
    setUrl("");
  };
  return (
    <div className="ActivityInteractionSubmission">
      {performances.length ? (
        <>
          <p>Previous Submissions:</p>
          <ul>
            {performances.map(({ id, createdAt }) => (
              <li key={id}>{createdAt}</li>
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
