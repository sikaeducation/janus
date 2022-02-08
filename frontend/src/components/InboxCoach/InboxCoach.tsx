import { identity } from "lodash/fp";
import { useContext, useEffect, useRef, useState } from "react";
import { promptContext } from "../../contexts/prompt";
import generateSlug from "../../utilities/generate-slug";
import InboxCoachPromptDisplay from "../InboxCoachPromptDisplay";
import InboxCoachPromptForm from "../InboxCoachPromptForm";
import "./InboxCoach.scss";

export default function CoachInbox() {
  const [prompt, setPrompt] = useState<string>("");
  const [tagString, setTagString] = useState<string>("");

  const {
    currentBroadcast,
    startInboxPrompt,
    endInboxPrompt,
    getCurrentPrompt,
  } = useContext(promptContext);

  const handleStartPrompt = (broadcast: rawBroadcast) => {
    const slug = generateSlug();
    const broadcastWithSlug = {
      ...broadcast,
      slug,
    };
    startInboxPrompt(broadcastWithSlug);
  };
  const handleEndPrompt = () => {
    endInboxPrompt();
  };

  const currentBroadcastRequested = useRef<boolean>(false);
  useEffect(() => {
    if (!currentBroadcastRequested.current) {
      getCurrentPrompt();
      currentBroadcastRequested.current = true;
    }
  });

  return (
    <div className="InboxCoach">
      {currentBroadcast ? (
        <InboxCoachPromptDisplay
          slug={currentBroadcast.slug || ""}
          endPrompt={handleEndPrompt}
          tags={currentBroadcast.tags?.split(",").filter(identity) || []}
          prompt={currentBroadcast.prompt}
        />
      ) : (
        <InboxCoachPromptForm
          startPrompt={handleStartPrompt}
          tagString={tagString}
          setTagString={setTagString}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      )}
    </div>
  );
}
