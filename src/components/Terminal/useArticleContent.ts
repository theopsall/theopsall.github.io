import { useState, useEffect } from 'react';

export const useArticleContent = (
  slug: string,
  fetchArticle: (slug: string) => Promise<string>,
) => {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchArticle(slug)
      .then((text) => { if (!cancelled) setContent(text); })
      .catch(() => { if (!cancelled) setError(`Failed to load article: ${slug}`); });
    return () => { cancelled = true; };
  }, [slug, fetchArticle]);

  return { content, error };
};
