import AppContent from "../AppContent";
import ButtonFormSubmission from "../ButtonFormSubmission";
import TextAreaResponse from "../TextAreaResponse";
import "./QuestionForm.scss";

type props = {
  id: string;
  prompt: string;
  response: string;
  setResponse: (response: string) => void;
  postResponse: ({
    response,
    prompt,
  }: {
    response: string;
    prompt: string;
  }) => void;
};

export default function QuestionForm({
  id,
  prompt,
  response,
  setResponse,
  postResponse,
}: props) {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    postResponse({ response, prompt });
  };
  return (
    <div className="QuestionForm">
      <AppContent className="prompt" isContained content={prompt} />
      <form onSubmit={handleSubmit}>
        <TextAreaResponse
          id={id}
          label="Response"
          content={response}
          action={setResponse}
        />
        <ButtonFormSubmission label="Submit response" />
      </form>
    </div>
  );
}
