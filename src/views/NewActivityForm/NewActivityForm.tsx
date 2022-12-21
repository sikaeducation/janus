import { useState } from "react";
import Button from "../../components/ui/Button";
import Form from "../../components/ui/Form";
import "./NewActivityForm.scss";

import newActivityFields from "./new-activity-fields";

type Props = {
  cancel: () => void;
  save: (newActivity: Activity) => void;
  saveAndPublish: (newActivity: Activity) => void;
};

export default function NewActivityForm({
  save,
  saveAndPublish,
  cancel,
}: Props) {
  const [newItem, setNewItem] = useState<ActivityArticle>({
    _type: "Article",
    title: "",
    post_slug: "",
    description: "",
    notes: "",
    published: false,
  } as const);

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
