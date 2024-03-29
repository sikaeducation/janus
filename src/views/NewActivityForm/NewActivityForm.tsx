import { ComponentPropsWithoutRef, useState } from "react";
import { Form } from "@sikaeducation/ui";
import "./NewActivityForm.scss";

import newActivityFields from "./new-activity-fields";
import { Activity, Article } from "@/declarations";

type Props = {
	cancel: () => void;
	save: (newActivity: Activity) => void;
};

export default function NewActivityForm({ save, cancel }: Props) {
	const [newItem, setNewItem] = useState<Article>({
		_type: "article",
		title: "",
		post_slug: "",
		description: "",
		notes: "",
		published: false,
	} as Article);

	const saveAndPublish = (newActivity: Article) => {
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
				setNewItem={(newItem) => setNewItem(newItem as Article)}
			/>
		</div>
	);
}
