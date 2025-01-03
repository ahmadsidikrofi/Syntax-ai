import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export default function RenderMessage({ content }) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="my-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-1 my-1 ml-10">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1 my-1 ml-10">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold my-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold my-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold my-2">{children}</h3>
          ),
          table({ children }) {
            return (
              <div className="overflow-x-auto my-2">
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
        {content}
      </ReactMarkdown>
    </div>
  );
}