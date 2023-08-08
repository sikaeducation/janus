import { useState } from "react";
import { Button, Form } from "@sikaeducation/ui";
import "./NewActivityForm.scss";

import newActivityFields from "./new-activity-fields";

type Props = {
  cancel: () => void;
  save: (newActivity: Activity) => void;
};

export default function NewActivityForm({ save, cancel }: Props) {
  const [newItem, setNewItem] = useState<ActivityArticle>({
    _type: "Article",
    title: "",
    post_slug: "",
    description: "",
    notes: "",
    published: false,
  } as const);

  const saveAndPublish = (newActivity: Activity) => {
    save({
      ...newActivity,
      published: true,
    });
  };

  const actions = [
    {
      label: "Cancel",
      Component: Button,
      action: () => cancel(),
      type: "ghost",
    },
    {
      label: "Save",
      Component: Button,
      action: () => save(newItem),
      size: "large",
      type: "secondary",
    },
    {
      label: "Save and Publish",
      Component: Button,
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
        setNewItem={setNewItem}
      />
    </div>
  );
}
