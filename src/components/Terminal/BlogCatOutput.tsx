import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface Props {
  slug: string;
  fetchArticle: (slug: string) => Promise<string>;
}

const BlogCatOutput: React.FC<Props> = ({ slug, fetchArticle }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticle(slug)
      .then(setContent)
      .catch(() => setError(`cat: ${slug}.md: No such file or directory`));
  }, [slug, fetchArticle]);

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
