import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Badge } from '@/components/ui/badge';
import type { ArticleMeta } from '@/components/Terminal/types';
import { useArticleContent } from './hooks/useArticleContent';
import { P10kInfoLine, P10kArrow } from '@/components/Terminal/components/P10kPrompt';

interface ArticleTabProps {
  slug: string;
  meta?: ArticleMeta;
  fetchArticle: (slug: string) => Promise<string>;
  isActive: boolean;
}

const ArticleTab: React.FC<ArticleTabProps> = ({ slug, meta, fetchArticle, isActive }) => {
  const { content, error } = useArticleContent(slug, fetchArticle);

  return (
    <div className="article-tab" style={{ display: isActive ? 'block' : 'none' }}>
      <div className="article-p10k-header">
        <P10kInfoLine showTime={false} />
        <div className="command-line">
          <P10kArrow />
          <span className="command-text">blog {slug}</span>
        </div>
      </div>
      <div className="article-viewer">
        {meta && (
          <div className="article-header">
            <div className="article-meta">
              <span className="article-date">{meta.date}</span>
              <span className="article-reading-time">{meta.readingTime}</span>
            </div>
            <div className="article-tags">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="article-tag">{tag}</Badge>
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
