import { useState } from "react";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import Form from "../../components/ui/Form";
import TextArea from "../../components/ui/TextArea";
import TextInput from "../../components/ui/TextInput";
import "./NewActivityForm.scss";

const newActivityFields = [
  {
    id: "title",
    label: "Title",
    Component: TextInput,
    type: undefined,
  } as const,
  {
    id: "post_slug",
    label: "Slug",
    Component: TextInput,
    type: undefined,
    required: true,
  } as const,
  {
    id: "description",
    label: "Description",
    Component: TextArea,
    type: undefined,
  } as const,
  {
    id: "notes",
    label: "Notes",
    Component: TextArea,
    type: undefined,
  } as const,
];

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
          <Checkbox
            id="published"
            label="Published"
            value={newItem.published}
            updateValue={() =>
              setNewItem({
                ...newItem,
                published: !newItem.published,
              })
            }
            type="secondary"
          />

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
