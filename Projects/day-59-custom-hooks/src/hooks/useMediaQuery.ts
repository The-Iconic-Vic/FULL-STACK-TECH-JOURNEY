import { useState, useEffect } from 'react';

/**
 * Hook for responsive design using CSS media queries
 * @param query - CSS media query string
 * @returns Boolean indicating if query matches
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export default useMediaQuery;