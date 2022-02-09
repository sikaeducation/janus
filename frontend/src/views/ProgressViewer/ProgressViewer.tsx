import { faCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { programContext } from "../../contexts/program";
import "./ProgressViewer.scss";

export const buildTree = (
  posts: Record<"string", hydratedPost>,
  currentSlug: string
): Record<string, Record<string, unknown>> => {
  return {
    [currentSlug]: {},
  };
};

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
  const rootSlug = program?.root?.slug || "";
  const sequence = getSequence(
    { [rootSlug]: postsBySlug[rootSlug], ...postsBySlug },
    rootSlug
  );
  console.log(sequence);

  return (
    sequence && (
      <div className="ProgressViewer">
        <h1>Progress</h1>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Student 1</th>
              <th>Student 2</th>
            </tr>
          </thead>
          <tbody>
            {sequence.map((activity: string) => (
              <tr>
                <th>{postsBySlug[activity].label.full}</th>
                <td>
                  <FontAwesomeIcon className="success" icon={faCheck} />
                </td>
                <td>
                  <FontAwesomeIcon className="failure" icon={faCheck} />
                </td>
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
