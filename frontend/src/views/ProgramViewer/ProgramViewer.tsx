/* eslint @typescript-eslint/no-non-null-assertion: "off", @typescript-eslint/no-shadow: "off" */
import "./ProgramViewer.scss";

type props = {
  program: programData;
};

function buildTree(posts: post[], postIds: number[]): JSX.Element[] {
  return postIds.map((postId) => {
    const post = posts.find((post) => post.id === postId)!;
    return (
      <li key={post.id} className="PostListing">
        {post.label.full}
        {post.children.length && <ul>{buildTree(posts, post.children)}</ul>}
      </li>
    );
  });
}

export default function ProgramViewer({ program }: props) {
  const units = program.root.children;
  const tree = buildTree(program.posts, units);

  return (
    <div className="ProgramViewer">
      <h1>Program Viewer: {program.label}</h1>
      <ul>
        <li className="PostListing">{program.root.label.full}</li>
        {tree}
      </ul>
    </div>
  );
}
