# Notes App - Day 18 Project

## Project Overview
A complete notes application with create, edit, delete, and search functionality. All notes are saved to localStorage and persist after page refresh.

## Skills Practiced
- `localStorage.setItem()` / `getItem()`
- `JSON.stringify()` / `JSON.parse()`
- CRUD operations (Create, Read, Update, Delete)
- Search/filter functionality
- Debounced search input
- Timestamps for notes

## File Structure
day-18-notes-app/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Features

| Feature | Description |
|---------|-------------|
| Create note | Title + content, auto timestamp |
| Edit note | Load existing note, update |
| Delete note | Remove individual note |
| Search notes | Filter by title (debounced) |
| Clear all | Delete all notes |
| Auto-save | Saves to localStorage on every change |
| First-visit data | Demo notes on first load |

## Data Structure
```javascript
{
    id: 1649376000000,
    title: "Note Title",
    content: "Note content...",
    timestamp: 1649376000000
}
LocalStorage Pattern
javascript
// Save notes
localStorage.setItem('notes', JSON.stringify(notes));

// Load notes
const saved = localStorage.getItem('notes');
notes = saved ? JSON.parse(saved) : defaultNotes;
Key Features
Create new notes with title and content

Edit existing notes (form updates, card shows selected)

Delete individual notes with confirmation

Search notes by title (real-time, debounced)

Delete all notes with confirmation

Notes show creation/update timestamp

Responsive grid layout

Auto-saves to localStorage on every change