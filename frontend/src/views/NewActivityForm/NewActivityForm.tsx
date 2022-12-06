/* eslint-disable camelcase */
import { ChangeEvent, useState } from "react";
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
  });

  const { title, post_slug, description, notes, published } = newActivity;

  const updateInputValues = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      const { value, name } = event.target;
      setNewActivity({
        ...newActivity,
        [name]: value,
      });
    }
  };
  const updateTextAreaValues = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target) {
      const { value, name } = event.target;
      setNewActivity({
        ...newActivity,
        [name]: value,
      });
    }
  };
  const togglePublished = () => {
    setNewActivity({
      ...newActivity,
      published: !newActivity.published,
    });
  };

  return (
    <div className="NewActivityForm">
      <form>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onInput={updateInputValues}
        />

        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="post_slug"
          type="text"
          value={post_slug}
          onInput={updateInputValues}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onInput={updateTextAreaValues}
          value={description}
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          onInput={updateTextAreaValues}
          value={notes}
        />

        <fieldset className="actions">
          <div className="checkbox-container">
            <label htmlFor="published">Published</label>
            <input
              type="checkbox"
              checked={published}
              onChange={togglePublished}
            />
          </div>

          <button type="button" onClick={() => save(newActivity)}>
            Save
          </button>
        </fieldset>
      </form>
    </div>
  );
}
