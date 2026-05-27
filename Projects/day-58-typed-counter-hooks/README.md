# Day 58: Typed React Hooks

## Project Overview
A React TypeScript application demonstrating typed hooks: useReducer, useRef, useImperativeHandle, and Custom Hooks.

## Features

| Component | Hook | Key Concept |
|-----------|------|-------------|
| TypedCounter | useReducer | Discriminated union actions |
| AutoCounter | useRef | Mutable refs, DOM refs |
| TypedForm | useImperativeHandle | Exposing methods to parent |
| Custom Hooks | Various | Reusable typed logic |

## Setup

```bash
npm install
npm run dev
TypeScript Concepts Demonstrated
useState<T> with explicit type parameters

useReducer with discriminated union actions

useRef<HTMLElement>(null) for DOM refs

useRef<T> for mutable refs

useImperativeHandle with custom interfaces

Generic custom hooks

Custom Hooks Included
useLocalStorage - Persist state to localStorage

useFetch - Data fetching with abort controller

useInterval - SetInterval as a hook

useDebounce - Debounce values

usePrevious - Track previous value

useToggle - Boolean toggle

useWindowSize - Track window dimensions