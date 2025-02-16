import ReactMarkdown from 'react-markdown';
import type { Components, ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import type { AnchorHTMLAttributes, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const customComponents: Partial<Components> = {
  // Enhanced link handling
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) => (
    <a
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-blue-600 hover:text-blue-800 underline"
    />
  ),
  
  // Enhanced code block handling
  code: ({ className, inline, children, ...props }: HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    return !inline && match ? (
      <div className="relative group">
        {language && (
          <span className="absolute right-2 top-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
            {language}
          </span>
        )}
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    ) : (
      <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm" {...props}>
        {children}
      </code>
    );
  },
  
  // Enhanced blockquote styling
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="pl-4 border-l-4 border-gray-200 text-gray-700 italic"
    />
  ),
  
  // Enhanced table styling
  table: (props: TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table {...props} className="min-w-full divide-y divide-gray-200" />
    </div>
  ),
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props} className="bg-gray-50" />
  ),
  th: (props: ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      {...props}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    />
  ),
  td: (props: TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td {...props} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" />
  ),
};

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className={`prose lg:prose-xl dark:prose-invert ${className}`}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize, rehypeHighlight]}
      components={customComponents}
    >
      {content}
    </ReactMarkdown>
  );
} 