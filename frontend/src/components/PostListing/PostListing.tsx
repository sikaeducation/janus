/* eslint @typescript-eslint/no-non-null-assertion: "off" */
import classNames from "classnames";
import "./PostListing.scss";
import { MouseEventHandler, KeyboardEventHandler } from "react";
import useClipboard from "react-use-clipboard";
import { useProgram } from "../../services/program";

declare module "react-use-clipboard" {
  export default interface useClipboard {
    (textToCopy: string): [boolean, () => void];
  }
}

type props = {
  post: hydratedPost;
  isActive: boolean;
  handlers: {
    click: MouseEventHandler;
    keyboard: KeyboardEventHandler;
  };
};

export default function PostListing({ post, isActive, handlers }: props) {
  const program = useProgram(1);
  let linksMarkdown = "";
  if (program) {
    const { posts } = program;
    linksMarkdown = posts
      .filter((eachPost) => {
        return post.children.includes(eachPost.slug);
      })
      .map((childPost) => {
        return `* [${childPost.label.full}](${childPost.path})`;
      })
      .join("\n");
  }
  const setCopied = useClipboard(linksMarkdown)[1];
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handlers.click}
      onKeyPress={handlers.keyboard}
      className="PostListing"
      data-testid="PostListing"
    >
      {post.label.short ?? post.label.full}
      <div
        className={classNames({
          "post-details": true,
          active: isActive,
        })}
      >
        <p>
          <span className="post-id" data-testid="slug">
            {post?.slug}
          </span>
          <span className="post-path" data-testid="path">
            {post?.path}
          </span>
          {post.children.length > 0 ? (
            <button type="button" onClick={setCopied} className="copy-links">
              Copy Links
            </button>
          ) : null}
        </p>
        <table>
          <tbody>
            <tr>
              <th>Full:</th>
              <td data-testid="full-label">{post.label.full}</td>
            </tr>
            <tr>
              <th>Short:</th>
              <td data-testid="short-label">{post.label.short}</td>
            </tr>
            <tr>
              <th>Tiny:</th>
              <td data-testid="tiny-label">{post.label.tiny}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
