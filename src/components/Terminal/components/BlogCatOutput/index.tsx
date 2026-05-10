import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useBlogCatContent } from './hooks/useBlogCatContent';

interface BlogCatOutputProps {
  slug: string;
  fetchArticle: (slug: string) => Promise<string>;
}

const BlogCatOutput: React.FC<BlogCatOutputProps> = ({ slug, fetchArticle }) => {
  const { content, error } = useBlogCatContent(slug, fetchArticle);

  if (error) return <p className="text-error">{error}</p>;
  if (!content) return <p className="text-muted-term">Loading…</p>;
  return (
    <div className="article-viewer" style={{ paddingTop: 0 }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogCatOutput;
