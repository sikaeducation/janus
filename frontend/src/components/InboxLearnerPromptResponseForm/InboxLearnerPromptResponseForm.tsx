import AppContent from "../AppContent";
import "./InboxLearnerPromptResponseForm.scss";

type props = {
  currentBroadcast: rawBroadcast;
  postResponse: (response: string) => void;
  response: string;
  setResponse: (response: string) => void;
};

export default function InboxLearnerPromptResponseForm({
  currentBroadcast,
  postResponse,
  response,
  setResponse,
}: props) {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    postResponse(response);
  };
  const { prompt } = currentBroadcast;

  return (
    <div className="InboxLearnerPromptResponseForm">
      <AppContent content={prompt} />
      <div className="submission-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="response">Response</label>
          <textarea
            id="response"
            className="response"
            value={response}
            onChange={(event) => {
              setResponse(event.target.value);
            }}
          >
            asdf
          </textarea>
          <div className="submission-section">
            <input type="submit" value="Post Response" />
          </div>
        </form>
      </div>
    </div>
  );
}
