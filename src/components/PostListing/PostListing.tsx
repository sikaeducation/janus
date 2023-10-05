import classNames from "classnames";
import "./PostListing.scss";
import {
	MouseEventHandler, KeyboardEventHandler, useContext,
} from "react";
import useClipboard from "react-use-clipboard";
import {
	programContext,
} from "../../contexts/program";

type props = {
	post: hydratedPost;
	isActive: boolean;
	handlers: {
		click: MouseEventHandler;
		keyboard: KeyboardEventHandler;
	};
};

export default function PostListing({
	post, isActive, handlers,
}: props) {
	const {
		program,
	} = useContext(programContext);
	let linksMarkdown = "";
	if (program) {
		const {
			posts,
		} = program;
		linksMarkdown = posts
			.filter((eachPost) => post.children.includes(eachPost.slug))
			.map((childPost) => (
				`* [${childPost.label.full}](${childPost.path})`
			))
			.join("\n");
	}
	const setCopied = useClipboard(linksMarkdown)[1];
	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handlers.click}
			onKeyPress={handlers.keyboard}
			className={classNames({
				PostListing: true,
				active: isActive,
			})}
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
					{post.children.length > 0
						? (
							<button type="button" onClick={setCopied} className="copy-links">
								Copy Links
							</button>
						)
						: null}
				</p>
				<table>
					<tbody>
						<tr>
							<th>Full:</th>
							<td data-testid="full-label">{post.label.full}</td>
						</tr>
						{post.label.short && (
							<tr>
								<th>Short:</th>
								<td data-testid="short-label">{post.label.short}</td>
							</tr>
						)}
						{post.label.tiny && (
							<tr>
								<th>Tiny:</th>
								<td data-testid="tiny-label">{post.label.tiny}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
