import { useState, useCallback } from 'react';

/**
 * A hook that manages a boolean toggle state.
 *
 * @param initialValue - The initial value of the toggle (default: false)
 * @returns A tuple of [value, toggle, setValue]
 *
 * @example
 * const [isOpen, toggleOpen] = useToggle();
 * const [isVisible, toggleVisible, setVisible] = useToggle(true);
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (val: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const set = useCallback((val: boolean) => {
    setValue(val);
  }, []);

  return [value, toggle, set];
}
