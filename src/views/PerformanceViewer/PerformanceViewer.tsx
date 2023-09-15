import { useAuth0 } from "@auth0/auth0-react";
import { createRef, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {
	flow,
	identity,
	keys,
	mapValues,
	omitBy,
	pick,
	sortBy,
	takeRight,
} from "lodash/fp";
import { format } from "date-fns";
import { performanceContext } from "../../contexts/performance";
import "./PerformanceViewer.scss";
import PerformanceList from "../../components/PerformanceList";
import PerformanceFilters from "../../components/PerformanceFilters";

const formatDate = (date: string) => format(new Date(date), "eeee, LLLL do");

export default function PerformanceViewer(){
	const { isAuthenticated } = useAuth0();
	const { performances, performancesByDay } = useContext(performanceContext);
	const [
		selectedStudentId,
		setSelectedStudentId,
	] = useState("all");
	const [
		selectedPerformanceType,
		setSelectedPerformanceType,
	] = useState("all");
	const [
		selectedDate,
		setSelectedDate,
	] = useState("all");
	const [
		isEnabled,
		setIsEnabled,
	] = useState(true);
	const lastMessageRef = createRef<HTMLLIElement>();

	const last5Days = flow([
		keys,
		sortBy(identity),
		takeRight(1),
	])(performancesByDay);
	const filterActive
    = selectedStudentId !== "all"
    || selectedPerformanceType !== "all"
    || selectedDate !== "all"
    || !isEnabled;
	const normalizedPerformancesByDay = filterActive
		? performancesByDay
		: pick(last5Days)(performancesByDay);

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

	const isForSelectedUser = (dayPerformances: evaluatedSubmissionPerformance[]) => dayPerformances.filter((dayPerformance) => selectedStudentId === "all"
        || dayPerformance.userId === selectedStudentId);
	const isForSelectedType = (dayPerformances: evaluatedSubmissionPerformance[]) => dayPerformances.filter((dayPerformance) => selectedPerformanceType === "all"
        || dayPerformance.type === selectedPerformanceType);
	const isForSelectedDate = (dayPerformances: evaluatedSubmissionPerformance[]) => dayPerformances.filter((dayPerformance) => selectedDate === "all"
        || formatDate(dayPerformance.createdAt) === selectedDate);
	const unevaluatedPerformances = (dayPerformances: evaluatedSubmissionPerformance[]) => dayPerformances.filter((dayPerformance) => [
		"submission",
		"question",
	].includes(dayPerformance.type)
        && !dayPerformance.evaluation?.status);
	const isUnevaluated = (dayPerformances: evaluatedSubmissionPerformance[]) => isEnabled ? dayPerformances : unevaluatedPerformances(dayPerformances);

	const filteredPerformancesByDay = flow([
		mapValues(isForSelectedUser),
		mapValues(isForSelectedType),
		mapValues(isForSelectedDate),
		mapValues(isUnevaluated),
		omitBy((value: unknown[]) => !value.length),
	])(normalizedPerformancesByDay);

	const toggleUnevaluated = () => {
		setIsEnabled(!isEnabled);
	};

	const scrollToBottom = () => {
		lastMessageRef?.current?.scrollIntoView({
			behavior: "smooth",
		});
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
        toggleUnevaluated={toggleUnevaluated}
        scrollToBottom={scrollToBottom}
        unevalutedPerformanceCount={
          unevaluatedPerformances(Object.values(performancesByDay).flat())
          	.length
        }
      />
      <PerformanceList
        lastMessageRef={lastMessageRef}
        performances={filteredPerformancesByDay}
      />
    </div>
	);
}
