import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export default function RenderMessage({ content }) {
  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table({ children }) {
            return (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                  {children}
                </table>
              </div>
            )
          },
          th({ children }) {
            return (
              <th className="border border-gray-400 bg-gray-200 px-4 py-2 text-left font-bold">
                {children}
              </th>
            )
          },
          td({ children }) {
            return (
              <td className="border border-gray-400 px-4 py-2">{children}</td>
            )
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`bg-gray-200 px-1 py-0.5 rounded ${className}`} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content.replace(/^- /gm, '-&nbsp;')}
      </ReactMarkdown>
    </div>
  );
}
