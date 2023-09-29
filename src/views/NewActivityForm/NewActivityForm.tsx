import { ComponentPropsWithoutRef, useState } from "react";
import { Form } from "@sikaeducation/ui";
import "./NewActivityForm.scss";

import newActivityFields from "./new-activity-fields";

type Props = {
	cancel: () => void;
	save: (newActivity: NewData) => void;
};
type FormData = string | boolean | number | string[];
type NewData = Record<string, FormData>

export default function NewActivityForm({ save, cancel }: Props) {
	const [
		newItem,
		setNewItem,
	] = useState<NewData>({
		_type: "Article",
		title: "",
		post_slug: "",
		description: "",
		notes: "",
		published: false,
	});

	const saveAndPublish = (newActivity: NewData) => {
		save({
			...newActivity,
			published: true,
		});
	};

	const actions: ComponentPropsWithoutRef<typeof Form>["actions"] = [
		{
			id: "cancel",
			label: "Cancel",
			action: () => cancel(),
			type: "ghost",
		},
		{
			id: "save",
			label: "Save",
			action: () => save(newItem),
			size: "large",
			type: "secondary",
		},
		{
			id: "save-and-publish",
			label: "Save and Publish",
			action: () => saveAndPublish(newItem),
			size: "large",
			type: "primary",
		},
	];

	return (
		<div className="NewActivityForm">
			<Form
				heading="Create Activity"
				fields={newActivityFields}
				actions={actions}
				newItem={newItem}
				setNewItem={(newItem) => setNewItem(newItem)}
			/>
		</div>
	);
}
