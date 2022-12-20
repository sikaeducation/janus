/* eslint-disable camelcase */
import { useState } from "react";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import Heading from "../../components/ui/Heading";
import TextArea from "../../components/ui/TextArea";
import TextInput from "../../components/ui/TextInput";
import "./NewActivityForm.scss";

type Props = {
  save: (newActivity: ActivityArticle) => void;
};

export default function NewActivityForm({ save }: Props) {
  const [newActivity, setNewActivity] = useState<ActivityArticle>({
    _type: "Article",
    title: "",
    post_slug: "",
    description: "",
    notes: "",
    published: false,
  } as const);

  const { title, post_slug, description, notes, published } = newActivity;

  type ActivityKeys = keyof typeof newActivity;
  const updateActivityProperty = (
    name: string,
    newValue: typeof newActivity[ActivityKeys]
  ) => {
    setNewActivity({
      ...newActivity,
      [name]: newValue,
    });
  };

  return (
    <div className="NewActivityForm">
      <Heading level={2}>Create Activity</Heading>
      <form>
        <TextInput
          id="title"
          label="Title"
          type="text"
          value={title}
          updateValue={(newValue) => updateActivityProperty("title", newValue)}
        />

        <TextInput
          id="slug"
          label="Slug"
          type="text"
          value={post_slug}
          updateValue={(newValue) =>
            updateActivityProperty("post_slug", newValue)
          }
        />

        <TextArea
          id="description"
          label="Description"
          updateValue={(newValue) =>
            updateActivityProperty("description", newValue)
          }
          value={description ?? ""}
        />

        <TextArea
          id="notes"
          label="Notes"
          updateValue={(newValue) => updateActivityProperty("notes", newValue)}
          value={notes ?? ""}
        />

        <fieldset className="actions">
          <Checkbox
            id="published"
            label="Published"
            value={published}
            updateValue={() => updateActivityProperty("published", !published)}
            type="secondary"
          />

          <Button type="primary" submit action={() => save(newActivity)}>
            Save
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
