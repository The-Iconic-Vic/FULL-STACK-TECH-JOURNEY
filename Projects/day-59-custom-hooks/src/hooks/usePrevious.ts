import { useRef, useEffect } from 'react';

/**
 * Hook that returns the previous value of a variable
 * @param value - Value to track
 * @returns Previous value (undefined on first render)
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;