import "./ProgramViewer.scss";
import {
	KeyboardEvent, useState,
} from "react";
import {
	Markdown,
} from "@sikaeducation/ui";
import PostListing from "../../components/PostListing";

type props = {
  program: hydratedProgram;
};

const buildTree = (
	posts: hydratedPost[],
	slugs: string[], // Don't coerce to slug, client doesn't have list
	currentPost: hydratedPost,
	handleClick: (post: hydratedPost) => () => void,
	handleEnter: (post: hydratedPost) => (event: KeyboardEvent) => void,
): JSX.Element[] => slugs
	// eslint-disable-next-line
		.map((slugId) => posts.find((post) => post.slug === slugId)!)
	.filter((post) => !!post)
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
              <ul>
                {buildTree(
                	posts,
                	post.children,
                	currentPost,
                	handleClick,
                	handleEnter,
                )}
              </ul>
            </li>,
			];
	});

export default function ProgramViewer({
	program,
}: props){
	const [
		currentPost,
		setCurrentPost,
	] = useState<hydratedPost>(program.root);
	const units = program.root.children;

	const handleClick = (post: hydratedPost) => () => {
		setCurrentPost(post);
	};
	const handleEnter = (post: hydratedPost) => (event: KeyboardEvent) => {
		if (event.key === "enter") setCurrentPost(post);
	};

	const tree = buildTree(
		program.posts,
		units,
		currentPost,
		handleClick,
		handleEnter,
	);

	return (
    <div className="ProgramViewer">
      <div className="ProgramViewer-wrapper">
        <ul className="post-listings">
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
        {currentPost
        	? (
          <Markdown className="post-content" content={currentPost.content} />
        	)
        	: null}
      </div>
    </div>
	);
}
