import "./InboxCoachPromptForm.scss";

type props = {
  startPrompt: (broadcast: rawBroadcast) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  tagString: string;
  setTagString: (tagString: string) => void;
};

export default function InboxCoachPromptForm({
  startPrompt,
  prompt,
  setPrompt,
  tagString,
  setTagString,
}: props) {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tagsArray = tagString
      .trim()
      .split(",")
      .map((string) => string.trim());
    const broadcast = {
      prompt,
      tags: tagsArray.join(","),
      responseType: "markdown",
    } as const;
    startPrompt(broadcast);
  };

  return (
    <form className="InboxCoachPromptForm" onSubmit={handleSubmit}>
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
        required
        onChange={(event) => {
          setPrompt(event.target.value);
        }}
      />
      <div className="submission-section">
        <input type="submit" value="Post Prompt" />
      </div>
    </form>
  );
}
