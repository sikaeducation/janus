import classNames from "classnames";
import "./PostListing.scss";
import { MouseEventHandler, KeyboardEventHandler } from "react";

type props = {
  post: hydratedPost;
  isActive: boolean;
  handlers: {
    click: MouseEventHandler;
    keyboard: KeyboardEventHandler;
  };
};

export default function PostListing({ post, isActive, handlers }: props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handlers.click}
      onKeyPress={handlers.keyboard}
      className="PostListing"
    >
      {post.label.short}
      <div
        className={classNames({
          "post-details": true,
          active: isActive,
        })}
      >
        <p>
          <span className="post-id">{post?.slug}</span>
          <span className="post-path">{post?.path}</span>
        </p>
        <table>
          <tbody>
            <tr>
              <th>Full:</th>
              <td>{post.label.full}</td>
            </tr>
            <tr>
              <th>Short:</th>
              <td>{post.label.short}</td>
            </tr>
            <tr>
              <th>Tiny:</th>
              <td>{post.label.tiny}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
