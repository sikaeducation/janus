import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { mapValues } from "lodash/fp";
import { performanceContext } from "../../contexts/performance";
import "./PerformanceViewer.scss";
import PerformanceList from "../../components/PerformanceList";

export default function PerformanceViewer() {
  const { isAuthenticated } = useAuth0();
  const { performances, performancesByDay } = useContext(performanceContext);
  const [selectedStudentId, setSelectedStudentId] = useState("all");
  const isForSelectedUser = (
    dayPerformances: evaluatedSubmissionPerformance[]
  ) => {
    return dayPerformances.filter(
      (dayPerformance) =>
        selectedStudentId === "all" ||
        dayPerformance.userId === selectedStudentId
    );
  };
  const filteredPerformancesByDay =
    mapValues(isForSelectedUser)(performancesByDay);

  const userIds = [
    ...Array.from(
      new Set<string>(performances.map((performance) => performance.userId))
    ),
  ];

  if (!isAuthenticated) return <Navigate replace to="/" />;

  return (
    <div className="PerformanceViewer">
      <h1>Activity</h1>
      <form>
        <label htmlFor="student-filter">Student</label>
        <select
          value={selectedStudentId}
          id="student-filter"
          onChange={(event) => setSelectedStudentId(event.target.value)}
        >
          <option value="all">All</option>
          {userIds.map((userId) => (
            <option key={userId}>{userId}</option>
          ))}
        </select>
      </form>
      <PerformanceList performances={filteredPerformancesByDay} />
    </div>
  );
}
