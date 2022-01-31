/* eslint @typescript-eslint/no-non-null-assertion: "off", @typescript-eslint/no-shadow: "off" */
import "./ProgramViewer.scss";
import { KeyboardEvent, useState } from "react";
import AppContent from "../../components/AppContent";
import PostListing from "../../components/PostListing";

type props = {
  program: hydratedProgram;
};

export default function ProgramViewer({ program }: props) {
  const [currentPost, setCurrentPost] = useState<hydratedPost>(program.root);
  const units = program.root.children;

  const handleClick = (post: hydratedPost) => {
    return () => {
      setCurrentPost(post);
    };
  };
  const handleEnter = (post: hydratedPost) => {
    return (event: KeyboardEvent) => {
      if (event.key === "enter") setCurrentPost(post);
    };
  };

  const buildTree = (
    posts: hydratedPost[],
    slugs: string[], // Don't coerce to slug, client doesn't have list
    currentPost: hydratedPost
  ): JSX.Element[] => {
    return slugs
      .map((slugId) => posts.find((post) => post.slug === slugId)!)
      .flatMap((post: hydratedPost) => {
        const postListing = (
          <li key={post.slug}>
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
              <li key={`${post.slug}--menu`}>
                <ul>{buildTree(posts, post.children, currentPost)}</ul>
              </li>,
            ];
      });
  };

  const tree = buildTree(program.posts, units, currentPost);

  return (
    <div className="ProgramViewer">
      <div className="ProgramViewer-wrapper">
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
        {currentPost ? (
          <AppContent performances={[]} content={currentPost.content} />
        ) : null}
      </div>
    </div>
  );
}
