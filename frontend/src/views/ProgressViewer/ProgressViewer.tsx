import { faCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Gravatar from "react-gravatar";
import { performanceContext } from "../../contexts/performance";
import { programContext } from "../../contexts/program";
import useIndicator from "../../hooks/use-indicator";
import "./ProgressViewer.scss";

export const getSequence = (
  posts: Record<string, hydratedPost>,
  rootSlug: string
): string[] => {
  if (!posts[rootSlug]) return [];
  const { children } = posts[rootSlug];

  return children.length
    ? [
        rootSlug,
        ...children.flatMap((child) => {
          return [...getSequence(posts, child)];
        }),
      ]
    : [rootSlug];
};

export default function ProgressViewer() {
  const { postsBySlug, program } = useContext(programContext);
  const { learners, lastPerformanceBySlugByLearner } =
    useContext(performanceContext);
  const getIndicator = useIndicator();
  const rootSlug = program?.root?.slug || "";
  const sequence = getSequence(
    { [rootSlug]: postsBySlug[rootSlug], ...postsBySlug },
    rootSlug
  );

  return (
    sequence && (
      <div className="ProgressViewer">
        <h1>Progress</h1>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              {learners.map((learner: string) => (
                <th key={learner}>
                  <Gravatar email={learner} size={60} title={learner} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sequence.map((slug: string) => (
              <tr key={slug}>
                <th>{postsBySlug[slug].label.full}</th>
                {learners.map((learner: string) => {
                  const post = postsBySlug[slug];
                  const slugPerformances = lastPerformanceBySlugByLearner[slug];
                  const learnerPerformance =
                    slugPerformances && slugPerformances[learner];
                  return learnerPerformance || post.type === "questions" ? (
                    <td key={`${learner}-${slug}`}>
                      {getIndicator(
                        post.type === "questions"
                          ? ({
                              type: "question",
                              postSlug: slug,
                            } as evaluatedQuestionPerformance)
                          : learnerPerformance
                      )}
                    </td>
                  ) : (
                    <td key={`${learner}-${slug}`}>&nbsp;</td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <th>Assignment 2</th>
              <td>
                <FontAwesomeIcon className="pending" icon={faQuestion} />
              </td>
              <td>
                <FontAwesomeIcon icon={faCheck} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
}
