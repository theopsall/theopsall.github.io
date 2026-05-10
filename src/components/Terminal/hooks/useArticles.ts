import { useState, useEffect, useCallback, useRef } from 'react';
import type { ArticleMeta, ArticleManifest } from '@/components/Terminal/types';

const MANIFEST_URL = './articles/index.json';

export const useArticles = () => {
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const contentCache = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    let cancelled = false;
    fetch(MANIFEST_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ArticleManifest>;
      })
      .then((data) => { if (!cancelled) setArticles(data.articles); })
      .catch(() => { if (!cancelled) setArticles([]); });
    return () => { cancelled = true; };
  }, []);

  const fetchArticle = useCallback(async (slug: string): Promise<string> => {
    const cached = contentCache.current.get(slug);
    if (cached) return cached;
    setLoading(true);
    try {
      const res = await fetch(`./articles/${slug}.md`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      contentCache.current.set(slug, text);
      return text;
    } finally {
      setLoading(false);
    }
  }, []);

  const getArticleBySlug = useCallback(
    (slug: string) => articles.find((a) => a.slug === slug),
    [articles]
  );

  return { articles, loading, fetchArticle, getArticleBySlug };
};
