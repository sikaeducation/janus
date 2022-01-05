/* eslint react/no-unstable-nested-components: "off", react/no-children-prop: "off", react/jsx-props-no-spreading: "off" */

import "./AppContent.scss";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as style } from "react-syntax-highlighter/dist/esm/styles/prism";

type props = {
  content: string;
};

export default function AppContent({ content }: props) {
  return (
    <article className="AppContent">
      <ReactMarkdown
        children={content}
        remarkPlugins={[gfm]}
        linkTarget="_blank"
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={style}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </article>
  );
}
