# Day 59: Typing Custom Hooks

## Project Overview
A React TypeScript application demonstrating 10 reusable, type-safe custom hooks.

## Custom Hooks Included

| Hook | Description | Type Signature |
|------|-------------|----------------|
| useToggle | Boolean toggle state | `[boolean, () => void, () => void, () => void]` |
| useLocalStorage<T> | Persist state to localStorage | `[T, (value: T) => void, () => void]` |
| useFetch<T> | Data fetching with loading/error | `{ data, loading, error, refetch }` |
| useDebounce<T> | Debounce values | `T` |
| usePrevious<T> | Track previous value | `T \| undefined` |
| useInterval | SetInterval as a hook | `void` |
| useTimeout | setTimeout as a hook | `void` |
| useEventListener | DOM event listener | `void` |
| useMediaQuery | Responsive design | `boolean` |
| useCopyToClipboard | Copy text to clipboard | `{ copy, copied, error }` |

## Setup

```bash
npm install
npm run dev
TypeScript Concepts Demonstrated
Generic types <T> for flexible hooks

Type inference in custom hooks

Return type annotations

Function overloads (useEventListener)

Utility types