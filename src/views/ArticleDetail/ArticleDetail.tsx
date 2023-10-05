import {
	Form,
} from "@sikaeducation/ui";
import "./ArticleDetail.scss";

type Props = {
	activity: ActivityArticle;
	setActivity: (article: ActivityArticle) => void;
};

type Mutable<T> = { -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? U[] : T[P] };

const fields = [
	{
		id: "published",
		label: "Published?",
		controlType: "Toggle",
	},
	{
		id: "title",
		label: "Title",
		controlType: "TextInput",
	},
	{
		id: "post_slug",
		label: "Slug",
		controlType: "TextInput",
	},
	{
		id: "description",
		label: "Description",
		controlType: "TextInput",
	},
	{
		id: "notes",
		label: "Notes",
		controlType: "TextArea",
	},
	{
		id: "content",
		label: "Content",
		controlType: "MarkdownPreviewer",
	},
] as const;
const actions = [
	{
		id: "save",
		label: "Save",
		type: "primary" as const,
		action: () => console.log("Primary action fired"),
	},
];

export default function ArticleDetail({
	activity, setActivity,
}: Props){
	return (
		<div className="ArticleDetail">
			<Form
				heading={activity.title}
				newItem={activity}
				setNewItem={(newItem) => setActivity(newItem as ActivityArticle)}
				fields={fields as Mutable<typeof fields>}
				actions={actions}
			/>
		</div>
	);
}
