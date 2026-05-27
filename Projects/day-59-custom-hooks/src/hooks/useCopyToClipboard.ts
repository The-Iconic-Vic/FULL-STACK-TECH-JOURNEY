import { useState, useCallback } from 'react';
import { CopyToClipboardResult } from '../types';

/**
 * Hook for copying text to clipboard
 * @returns { copy, copied, error }
 */
function useCopyToClipboard(): CopyToClipboardResult {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to copy'));
      setCopied(false);
    }
  }, []);

  return { copy, copied, error };
}

export default useCopyToClipboard;