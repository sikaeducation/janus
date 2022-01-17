/* eslint @typescript-eslint/no-non-null-assertion: "off", @typescript-eslint/no-shadow: "off" */
import "./ProgramViewer.scss";

type props = {
  program: programData;
};

function buildTree(posts: post[], postIds: number[]): JSX.Element[] {
  return postIds.map((postId) => {
    const post = posts.find((post) => post.id === postId)!;
    return !post.children.length ? (
      <li key={post.id} className="PostListing">
        {post.label.full}
      </li>
    ) : (
      <>
        <li key={post.id + 0.5}>{post.label.full}</li>
        <li key={post.id}>
          <ul>{buildTree(posts, post.children)}</ul>
        </li>
      </>
    );
  });
}

export default function ProgramViewer({ program }: props) {
  const root = program.posts.find((post) => post.path === "/")!;
  const units = root.children;
  const tree = buildTree(program.posts, units);

  return (
    <div className="ProgramViewer">
      <h1>Program Viewer: {program.label}</h1>
      <ul>
        <li className="PostListing">{root.label.full}</li>
        {tree}
      </ul>
    </div>
  );
}
