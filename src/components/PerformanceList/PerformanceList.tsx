import { format } from "date-fns";
import { useEffect, useRef } from "react";
import "./PerformanceList.scss";
import PerformanceListing from "../PerformanceListing";

type props = {
  performances: Record<string, evaluatedSubmissionPerformance[]>;
  lastMessageRef: React.RefObject<HTMLLIElement>;
};

const formatDate = (date: string) => format(new Date(date), "eeee, LLLL do");

export default function PerformanceList({
  performances,
  lastMessageRef,
}: props) {
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [performances, isInitialized, lastMessageRef]);

  return (
    <div className="PerformanceList">
      {Object.entries(performances).map(([date, performancesByDay]) => (
        <div key={date}>
          <h2>{formatDate(date)}</h2>
          <ul>
            {performancesByDay.map(
              (dayPerformance: evaluatedSubmissionPerformance) => (
                <li key={dayPerformance.id}>
                  <PerformanceListing performance={dayPerformance} />
                </li>
              ),
            )}
            <li className="dummy" ref={lastMessageRef} />
          </ul>
        </div>
      ))}
    </div>
  );
}
