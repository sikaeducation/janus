import { format } from "date-fns";
import "./PerformanceFilters.scss";

const formatDate = (date: string) => format(new Date(date), "eeee, LLLL do");

type props = {
  performances: evaluatedPerformance[];
  filters: Record<
    string,
    {
      state: string;
      setState: (state: string) => void;
    }
  >;
};

export default function PerformanceFilters({ performances, filters }: props) {
  const userIds = [
    ...Array.from(
      new Set<string>(performances.map((performance) => performance.userId))
    ),
  ];
  const performanceTypes = [
    ...Array.from(
      new Set<string>(performances.map((performance) => performance.type))
    ),
  ];
  const performanceTypesFormatted = {
    view: "Views",
    submission: "Submissions",
    prompt: "Prompt Responses",
  } as const;

  const dates = [
    ...Array.from(
      new Set<string>(
        performances.map((performance) => formatDate(performance.createdAt))
      )
    ),
  ];

  const clearFilters = () => {
    Object.values(filters).forEach((filter) => {
      filter.setState("all");
    });
  };

  return (
    <form className="PerformanceFilters">
      <h2>Filters</h2>
      <ul className="filters">
        <li className="filter">
          <label htmlFor="student-filter">Student</label>
          <select
            value={filters.student.state}
            id="student-filter"
            className="dropdown-filter"
            onChange={(event) => filters.student.setState(event.target.value)}
          >
            <option value="all">All</option>
            {userIds.map((userId) => (
              <option value={userId} key={userId}>
                {userId}
              </option>
            ))}
          </select>
        </li>
        <li className="filter">
          <label htmlFor="type-filter">Performance Type</label>
          <select
            value={filters.type.state}
            id="type-filter"
            className="dropdown-filter"
            onChange={(event) => filters.type.setState(event.target.value)}
          >
            <option value="all">All</option>
            {performanceTypes.map((performanceType) => (
              <option value={performanceType} key={performanceType}>
                {
                  performanceTypesFormatted[
                    performanceType as "view" | "prompt" | "submission"
                  ]
                }
              </option>
            ))}
          </select>
        </li>
        <li className="filter">
          <label htmlFor="date-filter">Date</label>
          <select
            value={filters.date.state}
            id="date-filter"
            className="dropdown-filter"
            onChange={(event) => filters.date.setState(event.target.value)}
          >
            <option value="all">All</option>
            {dates.map((date) => (
              <option value={date} key={date}>
                {date}
              </option>
            ))}
          </select>
        </li>
      </ul>
      <button className="clear" type="button" onClick={clearFilters}>
        Clear filters
      </button>
    </form>
  );
}
