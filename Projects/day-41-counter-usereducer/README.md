# Counter with useReducer - Day 41 Project

## Project Overview
A counter component demonstrating the useReducer hook for complex state management.

## Features
- Increment count
- Decrement count
- Reset to zero
- Set custom value
- Action type constants
- Payload for set_value action

## Key Concepts
- Reducer function (state, action) => newState
- useReducer hook returns [state, dispatch]
- Action types as constants
- Payload for additional data

## File Structure
src/
├── reducers/
│ └── counterReducer.js
├── components/
│ └── Counter.jsx
└── App.jsx

## Setup Instructions

```bash
cd day-41-counter-usereducer
npm install
npm run dev