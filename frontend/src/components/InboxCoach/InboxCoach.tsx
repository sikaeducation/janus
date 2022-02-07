import { useContext, useEffect, useState } from "react";
import { performanceContext } from "../../contexts/performance";
import InboxCoachPromptDisplay from "../InboxCoachPromptDisplay";
import InboxCoachPromptForm from "../InboxCoachPromptForm";
import "./InboxCoach.scss";

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

export default function CoachInbox() {
  const [formShouldDisplay, setFormShouldDisplay] = useState<boolean>(true);
  const [slug, setSlug] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagString, setTagString] = useState<string>("");
  const { startInboxPrompt, endInboxPrompt } = useContext(performanceContext);

  const handleEndPrompt = () => {
    endInboxPrompt();
    setFormShouldDisplay(true);
  };
  const handleStartPrompt = (broadcast: rawBroadcast) => {
    startInboxPrompt(broadcast);
    setFormShouldDisplay(false);
    setTags(broadcast.tags?.split(",").map((tag) => tag.trim()) || []);
  };

  useEffect(() => {
    const generatedSlug = generateSlug();
    setSlug(generatedSlug);
  }, [slug]);

  return (
    <div className="InboxCoach">
      {formShouldDisplay ? (
        <InboxCoachPromptForm
          startPrompt={handleStartPrompt}
          slug={slug}
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
