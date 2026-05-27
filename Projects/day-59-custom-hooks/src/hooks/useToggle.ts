import { useState, useCallback } from 'react';

/**
 * Hook for managing boolean state with toggle, setTrue, setFalse actions
 * @param initialValue - Initial boolean state (default: false)
 * @returns [value, toggle, setTrue, setFalse]
 */
function useToggle(initialValue: boolean = false): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
}

export default useToggle;