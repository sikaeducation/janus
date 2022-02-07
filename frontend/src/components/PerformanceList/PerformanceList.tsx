import { format } from "date-fns";
import { createRef, useEffect, useRef } from "react";
import "./PerformanceList.scss";
import PerformanceListing from "../PerformanceListing";

type props = {
  performances: Record<string, evaluatedSubmissionPerformance[]>;
};

const formatDate = (date: string) => {
  return format(new Date(date), "eeee, LLLL do");
};

export default function PerformanceList({ performances }: props) {
  const lastMessageRef = createRef<HTMLLIElement>();
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      lastMessageRef?.current?.scrollIntoView();
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
              )
            )}
            <li className="dummy" ref={lastMessageRef} />
          </ul>
        </div>
      ))}
    </div>
  );
}
