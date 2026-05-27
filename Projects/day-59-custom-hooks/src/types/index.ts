// ============================================
// FETCH TYPES
// ============================================

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface FetchOptions extends RequestInit {
  skip?: boolean;
}

// ============================================
// EVENT LISTENER TYPES
// ============================================

export type WindowEventMapKey = keyof WindowEventMap;
export type HTMLElementEventMapKey<K extends keyof HTMLElementEventMap> = K;

// ============================================
// COPY TO CLIPBOARD TYPES
// ============================================

export interface CopyToClipboardResult {
  copy: (text: string) => Promise<void>;
  copied: boolean;
  error: Error | null;
}

// ============================================
// USER TYPE (for fetch demo)
// ============================================

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}