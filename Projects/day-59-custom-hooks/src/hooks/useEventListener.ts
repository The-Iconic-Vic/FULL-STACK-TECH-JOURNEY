import { useEffect } from 'react';

/**
 * Hook for adding event listeners with automatic cleanup
 * @param eventName - Name of the event
 * @param handler - Event handler function
 * @param element - DOM element or window (default: window)
 */
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | null
): void;

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: T | null
): void;

function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element: Window | HTMLElement | null = window
): void {
  useEffect(() => {
    // Use EventTarget which is common to both Window and HTMLElement
    const targetElement: EventTarget | null = element ?? window;

    if (!targetElement || !('addEventListener' in targetElement)) return;

    targetElement.addEventListener(eventName, handler as EventListener);
    return () => {
      targetElement.removeEventListener(eventName, handler as EventListener);
    };
  }, [eventName, handler, element]);
}

export default useEventListener;