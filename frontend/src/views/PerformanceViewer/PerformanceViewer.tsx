import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { flow, mapValues, omitBy } from "lodash/fp";
import { format } from "date-fns";
import { performanceContext } from "../../contexts/performance";
import "./PerformanceViewer.scss";
import PerformanceList from "../../components/PerformanceList";
import PerformanceFilters from "../../components/PerformanceFilters";

const formatDate = (date: string) => format(new Date(date), "eeee, LLLL do");

export default function PerformanceViewer() {
  const { isAuthenticated } = useAuth0();
  const { performances, performancesByDay } = useContext(performanceContext);
  const [selectedStudentId, setSelectedStudentId] = useState("all");
  const [selectedPerformanceType, setSelectedPerformanceType] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");

  const filters = {
    date: {
      state: selectedDate,
      setState: setSelectedDate,
    },
    student: {
      state: selectedStudentId,
      setState: setSelectedStudentId,
    },
    type: {
      state: selectedPerformanceType,
      setState: setSelectedPerformanceType,
    },
  } as const;

  const isForSelectedUser = (
    dayPerformances: evaluatedSubmissionPerformance[]
  ) => {
    return dayPerformances.filter(
      (dayPerformance) =>
        selectedStudentId === "all" ||
        dayPerformance.userId === selectedStudentId
    );
  };
  const isForSelectedType = (
    dayPerformances: evaluatedSubmissionPerformance[]
  ) => {
    return dayPerformances.filter(
      (dayPerformance) =>
        selectedPerformanceType === "all" ||
        dayPerformance.type === selectedPerformanceType
    );
  };
  const isForSelectedDate = (
    dayPerformances: evaluatedSubmissionPerformance[]
  ) => {
    return dayPerformances.filter(
      (dayPerformance) =>
        selectedDate === "all" ||
        formatDate(dayPerformance.createdAt) === selectedDate
    );
  };

  const filteredPerformancesByDay = flow([
    mapValues(isForSelectedUser),
    mapValues(isForSelectedType),
    mapValues(isForSelectedDate),
    omitBy((value: unknown[]) => !value.length),
  ])(performancesByDay);

  if (!isAuthenticated) return <Navigate replace to="/" />;

  return (
    <div className="PerformanceViewer">
      <h1>Activity</h1>
      <PerformanceFilters performances={performances} filters={filters} />
      <PerformanceList performances={filteredPerformancesByDay} />
    </div>
  );
}
