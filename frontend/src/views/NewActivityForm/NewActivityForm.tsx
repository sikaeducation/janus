/* eslint-disable camelcase */
import { ChangeEvent, useState } from "react";
import Button from "../../components/ui/Button";
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
          <div className="checkbox-container">
            <label htmlFor="published">Published</label>
            <input
              type="checkbox"
              checked={published}
              onChange={() => updateActivityProperty("published", !published)}
            />
          </div>

          <Button type="primary" submit action={() => save(newActivity)}>
            Save
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
