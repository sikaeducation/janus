import { useContext, useEffect, useState } from "react";
import { performanceContext } from "../../contexts/performance";
import generateSlug from "../../utilities/generate-slug";
import InboxCoachPromptDisplay from "../InboxCoachPromptDisplay";
import InboxCoachPromptForm from "../InboxCoachPromptForm";
import "./InboxCoach.scss";

export default function CoachInbox() {
  const [formShouldDisplay, setFormShouldDisplay] = useState<boolean>(true);
  const [slug, setSlug] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagString, setTagString] = useState<string>("");
  const {
    currentBroadcast,
    startInboxPrompt,
    endInboxPrompt,
    getCurrentPrompt,
  } = useContext(performanceContext);

  const newSlug = () => {
    const generatedSlug = generateSlug();
    setSlug(generatedSlug);
  };

  const handleEndPrompt = () => {
    endInboxPrompt();
    setFormShouldDisplay(true);
  };
  const handleStartPrompt = (broadcast: rawBroadcast) => {
    newSlug();
    const broadcastWithSlug = {
      ...broadcast,
      slug,
    };
    startInboxPrompt(broadcastWithSlug);
    setFormShouldDisplay(false);
    setTags(broadcastWithSlug.tags?.split(",").map((tag) => tag.trim()) || []);
  };

  useEffect(() => {
    getCurrentPrompt();
  });

  if (currentBroadcast) {
    setSlug(currentBroadcast.slug || "");
    setTagString(currentBroadcast.tags || "");
    setPrompt(currentBroadcast.prompt || "");
    setFormShouldDisplay(false);
  }

  return (
    <div className="InboxCoach">
      {formShouldDisplay ? (
        <InboxCoachPromptForm
          startPrompt={handleStartPrompt}
          tagString={tagString}
          setTagString={setTagString}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      ) : (
        <InboxCoachPromptDisplay
          slug={slug}
          endPrompt={handleEndPrompt}
          tags={tags}
          prompt={prompt}
        />
      )}
    </div>
  );
}
