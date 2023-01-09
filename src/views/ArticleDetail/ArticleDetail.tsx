/* eslint-disable camelcase */
import Heading from "../../components/ui/Heading";
import Markdown from "../../components/ui/Markdown";
import "./ArticleDetail.scss";

type Props = {
  activity: ActivityArticle;
};

export default function ArticleDetail({ activity }: Props) {
  const { title, description, notes, content, post_slug } = activity;
  return (
    <div className="ArticleDetail">
      <Heading level={3}>{title}</Heading>
      <Heading level={4}>Slug</Heading>
      <p>{post_slug}</p>
      <Heading level={4}>Description</Heading>
      <p>{description}</p>
      <Heading level={4}>Notes</Heading>
      <p>{notes}</p>
      {content ? (
        <>
          <Heading level={4}>Content</Heading>
          <Markdown content={content} />
        </>
      ) : null}
    </div>
  );
}
