# Document Title Updater - Day 36 Project

## Project Overview
A React component demonstrating multiple useEffect patterns:
- Updating document title based on state
- Loading/saving to localStorage
- setInterval with cleanup
- Component mount/unmount logging

## Skills Practiced
- useEffect with empty array (run once on mount)
- useEffect with dependencies (run when values change)
- useEffect cleanup functions
- localStorage for persistence
- setInterval and clearInterval

## File Structure
day-36-document-title-updater/
├── src/
│ ├── components/
│ │ ├── TitleUpdater.jsx
│ │ └── TitleUpdater.module.css
│ ├── App.jsx
│ ├── App.module.css
│ └── main.jsx
├── package.json
├── vite.config.js
├── index.html
└── README.md

text

## useEffect Examples

### Effect 1: Update document title (dependency: title)
```javascript
useEffect(() => {
  if (title) {
    document.title = title
  }
}, [title])
Effect 2: Load from localStorage (empty array - mount only)
javascript
useEffect(() => {
  const savedTitle = localStorage.getItem('savedTitle')
  if (savedTitle) {
    setTitle(savedTitle)
  }
}, [])
Effect 3: Save to localStorage (dependency: title)
javascript
useEffect(() => {
  if (title) {
    localStorage.setItem('savedTitle', title)
  }
}, [title])
Effect 4: setInterval with cleanup
javascript
useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString())
  }, 10000)

  return () => clearInterval(intervalId)
}, [])
Effect 5: Mount/unmount logging
javascript
useEffect(() => {
  console.log('Component MOUNTED')
  return () => console.log('Component UNMOUNTED')
}, [])
Setup Instructions
bash
cd day-36-document-title-updater
npm install
npm run dev