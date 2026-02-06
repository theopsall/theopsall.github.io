import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import type { ArticleMeta } from './types';

interface ArticleTabProps {
  slug: string;
  meta?: ArticleMeta;
  fetchArticle: (slug: string) => Promise<string>;
  isActive: boolean;
}

const ArticleTab: React.FC<ArticleTabProps> = ({ slug, meta, fetchArticle, isActive }) => {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchArticle(slug)
      .then((text) => {
        if (!cancelled) setContent(text);
      })
      .catch(() => {
        if (!cancelled) setError(`Failed to load article: ${slug}`);
      });
    return () => { cancelled = true; };
  }, [slug, fetchArticle]);

  return (
    <div className="article-tab" style={{ display: isActive ? 'block' : 'none' }}>
      <div className="article-viewer">
        {meta && (
          <div className="article-header">
            <div className="article-meta">
              <span className="article-date">{meta.date}</span>
              <span className="article-reading-time">{meta.readingTime}</span>
            </div>
            <div className="article-tags">
              {meta.tags.map((tag) => (
                <span key={tag} className="article-tag">{tag}</span>
              ))}
            </div>
          </div>
        )}
        {error && <p className="text-error">{error}</p>}
        {!content && !error && <p className="text-muted-term">Loading article...</p>}
        {content && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default ArticleTab;
