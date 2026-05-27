import { useEffect, useRef } from 'react';

/**
 * Hook for setTimeout with automatic cleanup
 * @param callback - Function to execute after delay
 * @param delay - Delay in milliseconds (null to cancel)
 */
function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setTimeout(() => savedCallback.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

export default useTimeout;