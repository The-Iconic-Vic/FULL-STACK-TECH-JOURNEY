# Theme Context Demo - Day 40 Project

## Project Overview
Demonstration of React Context API for theme management (light/dark mode) across multiple components.

## Features
- Light/Dark theme toggle
- Theme preference saved to localStorage
- Theme available in Navbar, Toggle button, Cards, and HomePage
- No prop drilling - components access theme via useContext

## Key Concepts
- `createContext()` - Creates context object
- `Provider` - Wraps components needing access
- `useContext()` - Consumes context value
- Custom hook `useTheme()` for cleaner consumption

## File Structure
src/
├── contexts/
│ └── ThemeContext.jsx
├── components/
│ ├── Navbar.jsx
│ ├── ThemeToggle.jsx
│ └── Card.jsx
├── pages/
│ └── HomePage.jsx
├── App.jsx
└── main.jsx

text

## Setup Instructions

```bash
cd day-40-theme-context
npm install
npm run dev