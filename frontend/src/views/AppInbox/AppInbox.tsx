import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import AppContent from "../../components/AppContent";
import { performanceContext } from "../../contexts/performance";
import "./AppInbox.scss";

function generateSlug() {
  let result = "";
  const length = 12; // Hard-code slug length
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function AppInbox() {
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";

  return (
    <div className="AppInbox">
      <h1>Inbox</h1>
      {role === "coach" ? <CoachInbox /> : <LearnerInbox />}
    </div>
  );
}

function CoachInbox() {
  const [formShouldDisplay, setFormShouldDisplay] = useState<boolean>(true);
  const [prompt, setPrompt] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagString, setTagString] = useState<string>("");
  const { startInboxPrompt, endInboxPrompt } = useContext(performanceContext);

  const slug = generateSlug();

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tagsArray = tagString.split(",").map((string) => string.trim());
    setTags(tagsArray);
    const broadcast = {
      slug,
      prompt,
      tags: tagsArray.join(","),
      responseType: "markdown",
    } as const;
    startInboxPrompt(broadcast);
    setFormShouldDisplay(false);
  };
  const endPrompt = () => {
    endInboxPrompt();
    setFormShouldDisplay(true);
  };

  return (
    <div className="CoachInbox">
      {formShouldDisplay ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            className="tags"
            onChange={(event) => {
              setTagString(event.target.value);
            }}
            value={tagString}
          />
          <label htmlFor="question-prompt">Question prompt</label>
          <textarea
            id="question-prompt"
            className="question-prompt"
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
            }}
          >
            asdf
          </textarea>
          <div className="submission-section">
            <input type="submit" value="Post Question" />
          </div>
        </form>
      ) : (
        <InboxPromptDisplay endPrompt={endPrompt} tags={tags} prompt={prompt} />
      )}
    </div>
  );
}

type props = {
  tags: string[];
  prompt: string;
  endPrompt: () => void;
};

function InboxPromptDisplay({ tags, prompt, endPrompt }: props) {
  const handleEndPrompt = () => {
    endPrompt();
  };
  return (
    <div className="InboxPromptDisplay">
      <ul className="tags">
        {tags.map((tag) => (
          <li className="tag" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
      <AppContent content={prompt} />
      <div className="submission-section">
        <button onClick={handleEndPrompt} type="button">
          End Prompt
        </button>
      </div>
    </div>
  );
}

function LearnerInbox() {
  const { currentBroadcast } = useContext(performanceContext);
  return <div className="StudentInbox">Student</div>;
}
