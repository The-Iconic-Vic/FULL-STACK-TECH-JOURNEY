# User Directory - Day 37 Project

## Project Overview
A user directory application demonstrating data fetching in React with:
- Fetching data on component mount using useEffect
- Loading skeleton states
- Error handling with retry button
- Client-side search filtering
- Refresh functionality
- AbortController for cleanup

## Features
- Fetch users from JSONPlaceholder API
- Display users as cards with expandable details
- Loading skeleton animation
- Error handling with retry button
- Search by name, email, or company
- Refresh button to re-fetch data
- Responsive grid layout

## Key React Concepts
- `useEffect` for data fetching on mount
- `useState` for loading, error, and data states
- `useCallback` for stable fetch function
- `AbortController` for cleanup
- Loading skeleton UI
- Conditional rendering for loading/error/success states

## Setup Instructions

```bash
cd day-37-user-directory
npm install
npm run dev