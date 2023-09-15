import { TextArea, TextInput } from "@sikaeducation/ui";

const newActivityFields = [
	{
		id: "title",
		label: "Title",
		Component: TextInput,
		required: true,
	},
	{
		id: "post_slug",
		label: "Slug",
		Component: TextInput,
		required: true,
	},
	{
		id: "description",
		label: "Description",
		Component: TextArea,
	},
	{
		id: "notes",
		label: "Notes",
		Component: TextArea,
	},
];

export default newActivityFields;
