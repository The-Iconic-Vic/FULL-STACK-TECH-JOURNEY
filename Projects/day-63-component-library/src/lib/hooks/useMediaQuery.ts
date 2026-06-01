import { useState, useEffect } from 'react';

/**
 * A hook that evaluates a CSS media query and returns a reactive boolean.
 *
 * @param query - A CSS media query string (e.g. '(max-width: 768px)')
 * @returns `true` if the query matches, `false` otherwise
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 * const isLandscape = useMediaQuery('(orientation: landscape)');
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (q: string): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern API
    mql.addEventListener('change', handler);
    setMatches(mql.matches); // sync on mount

    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
