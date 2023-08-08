/* eslint-disable no-console */
/* eslint-disable camelcase */
import {
  EditableField,
  Markdown,
  Separator,
  TextArea,
  Toggle,
} from "@sikaeducation/ui";
import "./ArticleDetail.scss";

type Props = {
  activity: ActivityArticle;
};

export default function ArticleDetail({ activity }: Props) {
  const { title, description, notes, content, published, post_slug } = activity;
  const updateDescription = () => {
    console.log("Update description");
  };
  const updateNotes = () => {
    console.log("Update notes");
  };
  const updateValue = () => console.log("toggle published");
  return (
    <div className="ArticleDetail">
      <form>
        <header>
          <EditableField
            id="title"
            label="Title"
            value={title}
            updateValue={() => console.log("hi")}
            className="title Heading tertiary-heading"
          />
          <Toggle
            id="published"
            label="Live"
            updateValue={updateValue}
            value={published}
          />
          <EditableField
            id="code"
            label="Code"
            value={post_slug}
            updateValue={() => console.log("hi")}
            className="post-slug"
          />
        </header>
        <TextArea
          value={description}
          id="description"
          label="Description"
          updateValue={updateDescription}
          editable
        />
        <TextArea
          value={notes}
          id="notes"
          label="Notes"
          updateValue={updateNotes}
          editable
        />
        {content ? (
          <>
            <Separator />
            <Markdown content={content} />
          </>
        ) : null}
      </form>
    </div>
  );
}
