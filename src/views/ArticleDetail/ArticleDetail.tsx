import { Form } from "@sikaeducation/ui";
import { Article } from "../../declarations";
import "./ArticleDetail.scss";

type Props = {
	activity: Article;
	setActivity: (article: Article) => void;
};

const fields = [
	{
		id: "published",
		label: "Live",
		controlType: "Toggle",
		side: "right",
	} as const,
	{
		id: "title",
		label: "Title",
		controlType: "TextInput",
	} as const,
	{
		id: "post_slug",
		label: "Slug",
		controlType: "TextInput",
	} as const,
	{
		id: "description",
		label: "Description",
		controlType: "TextInput",
	} as const,
	{
		id: "notes",
		label: "Notes",
		controlType: "TextArea",
	} as const,
	{
		id: "content",
		label: "Content",
		controlType: "MarkdownPreviewer",
	} as const,
];
const actions = [
	{
		id: "save",
		label: "Save",
		type: "primary" as const,
		action: () => console.log("Primary action fired"),
	},
];

export default function ArticleDetail({ activity, setActivity }: Props) {
	return (
		<div className="ArticleDetail">
			<Form
				heading={activity.title}
				newItem={activity}
				setNewItem={(newItem) => setActivity(newItem as Article)}
				fields={fields}
				actions={actions}
			/>
		</div>
	);
}
