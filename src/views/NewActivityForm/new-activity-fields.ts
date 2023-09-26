import { TextArea, TextInput } from "@sikaeducation/ui";

const newActivityFields = [
	{
		id: "title",
		label: "Title",
		Component: TextInput,
		required: true,
		value: "",
	},
	{
		id: "post_slug",
		label: "Slug",
		Component: TextInput,
		required: true,
		value: "",
	},
	{
		id: "description",
		label: "Description",
		Component: TextArea,
		value: "",
	},
	{
		id: "notes",
		label: "Notes",
		Component: TextArea,
		value: "",
	},
];

export default newActivityFields;
