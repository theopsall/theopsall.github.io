import { useState, useEffect } from 'react';

export const useBlogCatContent = (slug: string, fetchArticle: (slug: string) => Promise<string>) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchArticle(slug)
      .then((text) => { if (!cancelled) setContent(text); })
      .catch(() => { if (!cancelled) setError(`cat: ${slug}.md: No such file or directory`); });
    return () => { cancelled = true; };
  }, [slug, fetchArticle]);

  return { content, error };
};
