/* eslint-disable camelcase */
import { useState } from "react";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import Heading from "../../components/ui/Heading";
import TextArea from "../../components/ui/TextArea";
import TextInput from "../../components/ui/TextInput";
import "./NewActivityForm.scss";

type Props = {
  save: (newItem: ActivityArticle) => void;
};

const heading = "Create Activity";
const controls = [
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
] as const;

const emptyNewItem = {
  _type: "Article",
  title: "",
  post_slug: "",
  description: "",
  notes: "",
  published: false,
} as const;

export default function NewActivityForm({ save }: Props) {
  const [newItem, setNewItem] = useState<ActivityArticle>(emptyNewItem);

  const Controls = controls.map(({ id, label, Component, type }) => (
    <Component
      id={id}
      label={label}
      value={newItem[id] || ""}
      updateValue={(newValue: unknown) =>
        setNewItem({
          ...newItem,
          [id]: newValue,
        })
      }
      type={type}
    />
  ));

  return (
    <div className="NewActivityForm">
      <Heading level={2}>{heading}</Heading>
      <form>
        {Controls}

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
      </form>
    </div>
  );
}
