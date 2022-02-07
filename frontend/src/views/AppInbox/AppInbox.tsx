/* eslint no-nested-ternary: "off" */
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import Gravatar from "react-gravatar";
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
      {role !== "coach" ? <CoachInbox /> : <LearnerInbox />}
    </div>
  );
}

function CoachInbox() {
  const [formShouldDisplay, setFormShouldDisplay] = useState<boolean>(true);
  const [slug, setSlug] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagString, setTagString] = useState<string>("");
  const { startInboxPrompt, endInboxPrompt } = useContext(performanceContext);

  useEffect(() => {
    const generatedSlug = generateSlug();
    setSlug(generatedSlug);
  }, [prompt]);

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
          />
          <div className="submission-section">
            <input type="submit" value="Post Question" />
          </div>
        </form>
      ) : (
        <CoachInboxPromptDisplay
          slug={slug}
          endPrompt={endPrompt}
          tags={tags}
          prompt={prompt}
        />
      )}
    </div>
  );
}

type props = {
  tags: string[];
  prompt: string;
  endPrompt: () => void;
  slug: string;
};

function CoachInboxPromptDisplay({ slug, tags, prompt, endPrompt }: props) {
  const { performances } = useContext(performanceContext);
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
      <ul className="responses">
        {performances
          .filter((performance) => {
            return performance.postSlug === slug;
          })
          .map((performance) => {
            return performance.type === "prompt" ? (
              <li key={performance.id}>
                <div className="prompt-response">
                  <Gravatar email={performance.userId} size={60} />
                  <AppContent content={performance.payload.response || ""} />
                </div>
              </li>
            ) : (
              (null as never)
            );
          })}
      </ul>
    </div>
  );
}

function LearnerInbox() {
  const [formShouldDisplay, setFormShouldDisplay] = useState<boolean>(true);
  const [response, setResponse] = useState<string>("");
  const { currentBroadcast, postPerformance } = useContext(performanceContext);
  const { user } = useAuth0();
  const postResponse = (postedResponse: string) => {
    postPerformance({
      userId: user?.email || "",
      postSlug: currentBroadcast?.slug || "",
      type: "prompt",
      payload: {
        response: postedResponse,
        prompt: currentBroadcast?.prompt || "",
      },
    });
    setFormShouldDisplay(false);
  };

  return (
    <div className="LearnerInbox">
      {currentBroadcast ? (
        formShouldDisplay ? (
          <LearnerInboxPromptResponseForm
            response={response}
            setResponse={setResponse}
            postResponse={postResponse}
            currentBroadcast={currentBroadcast}
          />
        ) : (
          <LearnerInboxPromptResponseDisplay
            response={response}
            currentBroadcast={currentBroadcast}
          />
        )
      ) : (
        <p>Nothing for now!</p>
      )}
    </div>
  );
}

function LearnerInboxPromptResponseDisplay({
  currentBroadcast,
  response,
}: {
  currentBroadcast: rawBroadcast;
  response: string;
}) {
  const { prompt } = currentBroadcast;
  return (
    <>
      <AppContent content={prompt} />
      <AppContent content={response} />
    </>
  );
}

function LearnerInboxPromptResponseForm({
  currentBroadcast,
  postResponse,
  response,
  setResponse,
}: {
  currentBroadcast: rawBroadcast;
  postResponse: (response: string) => void;
  response: string;
  setResponse: (response: string) => void;
}) {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    postResponse(response);
  };
  const { prompt } = currentBroadcast;

  return (
    <div className="StudentInbox">
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
