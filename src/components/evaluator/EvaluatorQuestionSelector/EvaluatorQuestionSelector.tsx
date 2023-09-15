import "./EvaluatorQuestionSelector.scss";

type props = {
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
  slugs: string[];
};

export default function EvaluatorQuestionSelector({
	selectedSlug,
	setSelectedSlug,
	slugs,
}: props){
	return (
    <form className="EvaluatorQuestionSelector">
      <label htmlFor="slug-selector">Slug</label>
      <select
        id="slug-selector"
        value={selectedSlug}
        onChange={(event) => setSelectedSlug(event.target.value)}
      >
        <option disabled>Select an activity to evaluate</option>
        {slugs.map((slug) => (
          <option key={slug} value={slug}>
            {slug}
          </option>
        ))}
      </select>
    </form>
	);
}
