import {
	Markdown,
} from "@sikaeducation/ui";
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
}: props){
	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		postResponse(response);
	};
	const {
		prompt,
	} = currentBroadcast;

	return (
    <div className="InboxLearnerPromptResponseForm">
      <Markdown className="prompt" content={prompt} />
      <div className="submission-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="response">Response</label>
          <textarea
            id="response"
            className="response"
            value={response}
            required
            onChange={(event) => {
            	setResponse(event.target.value);
            }}
          />
          <div className="submission-section">
            <input type="submit" value="Post Response" />
          </div>
        </form>
      </div>
    </div>
	);
}
