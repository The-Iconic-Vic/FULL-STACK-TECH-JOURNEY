// ============================================
// COUNTER TYPES (for useReducer)
// ============================================

export type CounterState = {
  count: number;
  loading: boolean;
  error: string | null;
};

export type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// ============================================
// FORM HANDLE TYPES (for useImperativeHandle)
// ============================================

export interface FormHandle {
  submit: () => void;
  reset: () => void;
  getValues: () => FormData;
  setField: (name: keyof FormData, value: string) => void;
  focusField: (name: keyof FormData) => void;
  validate: () => boolean;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}