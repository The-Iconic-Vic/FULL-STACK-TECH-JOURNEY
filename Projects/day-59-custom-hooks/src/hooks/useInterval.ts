import { useEffect, useRef } from 'react';

/**
 * Hook for setInterval with automatic cleanup
 * @param callback - Function to execute on each interval
 * @param delay - Delay in milliseconds (null to pause)
 */
function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;