import { useState } from "react";
import Button from "../../components/ui/Button";
import Form from "../../components/ui/Form";
import "./NewActivityForm.scss";

import newActivityFields from "./new-activity-fields";

type Props = {
  save: (newActivity: Activity) => void;
};

export default function NewActivityForm({ save }: Props) {
  const [newItem, setNewItem] = useState<ActivityArticle>({
    _type: "Article",
    title: "",
    post_slug: "",
    description: "",
    notes: "",
    published: false,
  } as const);

  return (
    <div className="NewActivityForm">
      <Form
        heading="Create Activity"
        fields={newActivityFields}
        newItem={newItem}
        setNewItem={setNewItem}
      >
        <fieldset className="actions">
          <Button
            type="primary"
            size="large"
            submit
            action={() => save(newItem)}
          >
            Save
          </Button>
        </fieldset>
      </Form>
    </div>
  );
}
