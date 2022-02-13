import { useContext, useEffect, useState } from "react";
import YAML from "yaml";
import { programContext } from "../../contexts/program";
import QuestionForm from "../QuestionForm";
import "./ActivityInteractionQuestions.scss";

type props = {
  userId: string;
  postPerformance: (performance: rawPerformance) => void;
  postSlug: string;
};

export default function ActivityInteractionQuestions({
  userId,
  postPerformance,
  postSlug,
}: props) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[postSlug];
  const frontmatter = /^---\s([\s\S]*?)\s---/.exec(post.content);
  const parsedFrontmatter = YAML.parse((frontmatter && frontmatter[1]) || "");
  const { questions } = parsedFrontmatter;
  useEffect(() => {
    const formQuestions = questions.reduce(
      (
        existingQuestions: Record<string, string>,
        question: { id: string; prompt: string }
      ) => ({
        ...existingQuestions,
        [question.id]: "",
      }),
      {}
    );
    setResponses(formQuestions);
    // eslint-disable-next-line
  }, []);
  const updateResponse = (id: string) => (response: string) => {
    setResponses({
      ...responses,
      [id]: response,
    });
  };
  const postResponse =
    (questionId: string) =>
    ({ prompt, response }: { prompt: string; response: string }) => {
      postPerformance({
        type: "question",
        postSlug: questionId,
        userId,
        payload: {
          response,
          prompt,
          originalPostSlug: postSlug,
        },
      });
    };
  if (!frontmatter || !frontmatter[1]) return null;

  return (
    <div className="ActivityInteractionQuestions">
      <ul>
        {questions.map((question: { id: string; prompt: string }) => (
          <li key={question.id}>
            <QuestionForm
              id={`${postSlug}-question-${question.id}`}
              prompt={question.prompt}
              response={responses[question.id]}
              setResponse={updateResponse(question.id)}
              postResponse={postResponse(`${postSlug}-question-${question.id}`)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
