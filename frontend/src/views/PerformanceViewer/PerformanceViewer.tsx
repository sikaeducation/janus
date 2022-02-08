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
  const [isEnabled, setIsEnabled] = useState(true);

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
  const isUnevaluated = (dayPerformances: evaluatedSubmissionPerformance[]) => {
    return isEnabled
      ? dayPerformances
      : dayPerformances.filter((dayPerformance) => {
          console.log("got here", dayPerformance);
          return (
            dayPerformance.type === "submission" &&
            !dayPerformance.evaluation?.status
          );
        });
  };

  const filteredPerformancesByDay = flow([
    mapValues(isForSelectedUser),
    mapValues(isForSelectedType),
    mapValues(isForSelectedDate),
    mapValues(isUnevaluated),
    omitBy((value: unknown[]) => !value.length),
  ])(performancesByDay);

  const filterUnevaluated = () => {
    setIsEnabled(false);
  };

  if (!isAuthenticated) return <Navigate replace to="/" />;

  return (
    <div className="PerformanceViewer">
      <h1>Activity</h1>
      <PerformanceFilters
        performances={performances}
        filters={filters}
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        filterUnevaluated={filterUnevaluated}
      />
      <PerformanceList performances={filteredPerformancesByDay} />
    </div>
  );
}
