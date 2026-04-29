# Custom Hooks Demo - Day 38 Project

## Project Overview
A demonstration of custom React hooks including:
- useToggle - Boolean toggle functionality
- useLocalStorage - Sync state with localStorage
- useFetch - Reusable data fetching with caching
- useWindowSize - Track window dimensions

## Features
- Multiple components using the same useFetch hook
- Caching system prevents duplicate API requests
- Manual refetch capability
- Loading and error states
- Dark mode toggle with localStorage persistence
- Modal and dropdown controlled by useToggle

## Custom Hooks Created

| Hook | Purpose | Returns |
|------|---------|---------|
| useToggle | Boolean toggle | [value, toggle, setTrue, setFalse] |
| useLocalStorage | Persist state | [storedValue, setValue] |
| useFetch | Data fetching | { data, loading, error, refetch } |
| useWindowSize | Window dimensions | { width, height } |

## Setup Instructions

```bash
cd day-38-custom-hooks-demo
npm install
npm run dev
