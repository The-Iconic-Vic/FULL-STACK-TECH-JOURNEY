# Day 60: Typing Context & Global State

## Project Overview
A React TypeScript application demonstrating type-safe Context API patterns including Theme, Auth, Todo, and Notification management.

## Features

### Theme Context
- Light/Dark mode toggle
- System preference detection
- LocalStorage persistence
- CSS custom properties for theming

### Auth Context
- Login/Logout functionality
- Loading and error states
- Type-safe reducer actions
- Split state/dispatch contexts

### Todo Context
- Full CRUD operations
- Filter by status (All/Active/Completed)
- LocalStorage persistence
- Action creators pattern

### Notification Context
- Multiple notification types (success, error, info, warning)
- Auto-dismiss with configurable duration
- Manual dismiss
- Clean API with helper methods

## Setup

```bash
npm install
npm run dev
TypeScript Concepts Demonstrated
createContext<T | undefined> pattern

Discriminated unions for reducer actions

Context splitting for performance

Custom hooks with error checking

Provider composition

Generic localStorage utilities