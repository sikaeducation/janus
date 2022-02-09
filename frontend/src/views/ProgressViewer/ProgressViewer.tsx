import { faCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Gravatar from "react-gravatar";
import { performanceContext } from "../../contexts/performance";
import { programContext } from "../../contexts/program";
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

const getIndicatorByType = (performance: postedPerformance) => {
  const indicatorsByType = {
    view: (viewPerformance: postedViewPerformance) => {
      const viewIndicators = {
        1: <FontAwesomeIcon className="failure" icon={faCheck} />,
        2: <FontAwesomeIcon icon={faCheck} />,
        3: <FontAwesomeIcon className="success" icon={faCheck} />,
      } as const;
      return viewIndicators[
        viewPerformance.payload.confidenceLevel as confidenceLevel
      ];
    },
    submission: (submissionPerformance: evaluatedSubmissionPerformance) => {
      const submissionIndicators = {
        accepted: <FontAwesomeIcon className="success" icon={faCheck} />,
        rejected: <FontAwesomeIcon className="failure" icon={faCheck} />,
        default: <FontAwesomeIcon icon={faQuestion} />,
      } as const;
      return submissionIndicators[
        submissionPerformance.evaluation?.status || "default"
      ];
    },
    prompt: () => {
      return <FontAwesomeIcon icon={faCheck} />;
    },
    default: () => {
      return <FontAwesomeIcon icon={faCheck} />;
    },
  } as const;

  switch (performance.type) {
    case "view":
      return indicatorsByType[performance.type](performance);
      break;
    case "submission":
      return indicatorsByType[performance.type](performance);
      break;
    case "prompt":
      return indicatorsByType[performance.type]();
      break;
    default:
      return indicatorsByType.default();
  }
};

export default function ProgressViewer() {
  const { postsBySlug, program } = useContext(programContext);
  const { learners, performancesBySlugByLearner } =
    useContext(performanceContext);
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
                  const slugPerformances = performancesBySlugByLearner[slug];
                  const learnerPerformance =
                    slugPerformances && slugPerformances[learner];
                  return learnerPerformance ? (
                    <td key={learnerPerformance.postSlug}>
                      {getIndicatorByType(learnerPerformance)}
                    </td>
                  ) : (
                    <td>&nbsp;</td>
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
