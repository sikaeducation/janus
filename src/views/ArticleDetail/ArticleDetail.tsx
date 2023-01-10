/* eslint-disable no-console */
/* eslint-disable camelcase */
import Heading from "../../components/ui/Heading";
import Markdown from "../../components/ui/Markdown";
import Separator from "../../components/ui/Separator";
import TextArea from "../../components/ui/TextArea";
import Toggle from "../../components/ui/Toggle";
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
          <Heading className="title" level={3} margin={false}>
            {title}
          </Heading>
          <Toggle
            id="published"
            label="Live"
            updateValue={updateValue}
            value={published}
          />
          <code className="post-slug">{post_slug}</code>
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
