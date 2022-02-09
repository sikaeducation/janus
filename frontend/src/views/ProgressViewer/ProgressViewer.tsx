import { faCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProgressViewer.scss";

export default function ProgressViewer() {
  return (
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
          <tr>
            <th>Assignment 1</th>
            <td>
              <FontAwesomeIcon className="success" icon={faCheck} />
            </td>
            <td>
              <FontAwesomeIcon className="failure" icon={faCheck} />
            </td>
          </tr>
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
  );
}
