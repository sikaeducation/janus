/* eslint @typescript-eslint/no-non-null-assertion: "off", @typescript-eslint/no-shadow: "off" */
import "./ProgramViewer.scss";
import { KeyboardEvent, useState } from "react";
import AppContent from "../../components/AppContent";

type props = {
  program: programData;
};

export default function ProgramViewer({ program }: props) {
  const handleClick = (post: post) => {
    return () => {
      setCurrentPost(post);
    };
  };
  const handleEnter = (post: post) => {
    return (event: KeyboardEvent) => {
      if (event.key === "enter") setCurrentPost(post);
    };
  };

  const buildTree = (posts: post[], postIds: number[]): JSX.Element[] => {
    return postIds
      .map((postId) => posts.find((post) => post.id === postId)!)
      .reduce((list: JSX.Element[], post: post) => {
        const postElements = [
          ...list,
          <li key={post.id}>
            <div
              role="button"
              tabIndex={0}
              onClick={handleClick(post)}
              onKeyPress={handleEnter(post)}
              className="PostListing"
            >
              {post.label.short}
            </div>
          </li>,
        ];
        return post.children.length > 0
          ? [
              ...postElements,
              <li>
                <ul>{buildTree(posts, post.children)}</ul>
              </li>,
            ]
          : postElements;
      }, []);
  };

  const units = program.root.children;
  const tree = buildTree(program.posts, units);
  const [currentPost, setCurrentPost] = useState<post | null>(null);

  return (
    <div className="ProgramViewer">
      <div className="ProgramViewer-wrapper">
        <h1>Program Viewer: {program.label}</h1>
        <ul>
          <li>
            <div
              role="button"
              tabIndex={0}
              onClick={handleClick(program.root)}
              onKeyPress={handleEnter(program.root)}
              className="PostListing"
            >
              {program.root.label.short}
            </div>
          </li>
          {tree}
        </ul>
        {currentPost ? <AppContent content={currentPost.content} /> : null}
      </div>
    </div>
  );
}
