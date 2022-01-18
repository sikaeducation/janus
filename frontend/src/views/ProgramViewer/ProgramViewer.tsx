/* eslint @typescript-eslint/no-non-null-assertion: "off", @typescript-eslint/no-shadow: "off" */
import "./ProgramViewer.scss";
import { KeyboardEvent, useState } from "react";
import AppContent from "../../components/AppContent";
import PostListing from "../../components/PostListing";

type props = {
  program: programData;
};

export default function ProgramViewer({ program }: props) {
  const [currentPost, setCurrentPost] = useState<post>(program.root);
  const units = program.root.children;

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

  const buildTree = (
    posts: post[],
    postIds: number[],
    currentPost: post
  ): JSX.Element[] => {
    return postIds
      .map((postId) => posts.find((post) => post.id === postId)!)
      .flatMap((post: post) => {
        const postListing = (
          <li key={post.id}>
            <PostListing
              post={post}
              isActive={currentPost?.path === post.path}
              handlers={{
                click: handleClick(post),
                keyboard: handleEnter(post),
              }}
            />
          </li>
        );
        return post.children.length === 0
          ? postListing
          : [
              postListing,
              <li key={post.id + 0.5}>
                <ul>{buildTree(posts, post.children, currentPost)}</ul>
              </li>,
            ];
      });
  };

  const tree = buildTree(program.posts, units, currentPost);

  return (
    <div className="ProgramViewer">
      <div className="ProgramViewer-wrapper">
        <h1>Program Viewer: {program.label}</h1>
        <ul>
          <li>
            <PostListing
              post={program.root}
              isActive={currentPost?.path === program.root.path}
              handlers={{
                click: handleClick(program.root),
                keyboard: handleEnter(program.root),
              }}
            />
          </li>
          {tree}
        </ul>
        {currentPost ? <AppContent content={currentPost.content} /> : null}
      </div>
    </div>
  );
}
