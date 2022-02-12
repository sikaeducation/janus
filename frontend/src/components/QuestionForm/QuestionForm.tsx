import ButtonFormSubmission from "../ButtonFormSubmission";
import TextAreaResponse from "../TextAreaResponse";
import "./QuestionForm.scss";

type props = {
  id: string;
  prompt: string;
  response: string;
  setResponse: (response: string) => void;
};

export default function QuestionForm({
  id,
  prompt,
  response,
  setResponse,
}: props) {
  return (
    <div className="QuestionForm">
      <div>{prompt}</div>
      <form>
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
