import classNames from "classnames";
import { useContext } from "react";
import Gravatar from "react-gravatar";
import { performanceContext } from "../../contexts/performance";
import { programContext } from "../../contexts/program";
import useIndicator from "../../hooks/use-indicator";
import "./ProgressViewer.scss";

export const getSequence = (
  posts: Record<string, hydratedPost>,
  root: hydratedPost,
): hydratedPost[] => {
  if (!posts[root.slug]) return [];
  const { children } = posts[root.slug];

  return children.length
    ? [
        root,
        ...children.flatMap((child) => [...getSequence(posts, posts[child])]),
      ]
    : [root];
};

export default function ProgressViewer() {
  const { postsBySlug, program } = useContext(programContext);
  const { learners, lastPerformanceBySlugByLearner } =
    useContext(performanceContext);
  const getIndicator = useIndicator();
  const rootSlug = program?.root?.slug || "";
  const ignoredTypes = ["root", "unit", "guide", "section", "concept", "meta"];
  const sequence = program?.root
    ? getSequence(
        {
          [rootSlug]: postsBySlug[rootSlug],
          ...postsBySlug,
        },
        program.root,
      ).filter((post) => !ignoredTypes.includes(post.type))
    : [];

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
            {sequence.map(({ type, slug, isRequired }: hydratedPost) => (
              <tr
                key={slug}
                className={classNames({
                  required: isRequired,
                  topic: type === "topic",
                })}
              >
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
                              type: "questions",
                              postSlug: slug,
                              userId: learner,
                            } as unknown as evaluatedQuestionPerformance)
                          : learnerPerformance,
                      )}
                    </td>
                  ) : (
                    <td key={`${learner}-${slug}`}>&nbsp;</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
