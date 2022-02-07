import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { mapValues } from "lodash/fp";
import { performanceContext } from "../../contexts/performance";
import "./PerformanceList.scss";
import PerformanceListing from "../../components/PerformanceListing";

export default function PerformanceList() {
  const { isAuthenticated } = useAuth0();
  const { performances, performancesByDay } = useContext(performanceContext);
  const lastMessageRef = createRef<HTMLLIElement>();
  const isInitialized = useRef<boolean>(false);
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

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      lastMessageRef?.current?.scrollIntoView();
    }
  }, [performances, isInitialized, lastMessageRef]);

  if (!isAuthenticated) return <Navigate replace to="/" />;

  return (
    <div className="PerformanceList">
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
      <div className="submissions">
        {Object.entries(filteredPerformancesByDay).map(
          ([date, performanceByDay]) => (
            <div key={date}>
              <h2>{format(new Date(date), "eeee, LLLL do")}</h2>
              <ul>
                {performanceByDay.map(
                  (performance: evaluatedSubmissionPerformance) => (
                    <li key={performance.id}>
                      <PerformanceListing performance={performance} />
                    </li>
                  )
                )}
                <li className="dummy" ref={lastMessageRef} />
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}
