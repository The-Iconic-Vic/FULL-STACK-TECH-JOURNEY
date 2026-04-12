# Week 3 Capstone: Personal Task Manager

## Project Overview
A complete, production-ready task management application with full CRUD operations, filtering, sorting, searching, drag-and-drop, dark mode, and data persistence.

## Technologies Used
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, animations, responsive design |
| JavaScript | All application logic |
| LocalStorage | Data persistence |
| Drag and Drop API | Task reordering |

## Features Implemented

### Core Features ✅
| Feature | Description |
|---------|-------------|
| Add Task | Title, description, due date, priority, category |
| Edit Task | Modify existing tasks |
| Delete Task | Remove individual tasks |
| Toggle Complete | Mark as complete/incomplete |
| Filter | All, Active, Completed |
| Sort | By date, priority, alphabetically |
| Search | Filter by title |

### Data Persistence ✅
- Save to localStorage on every change
- Load tasks on page refresh

### UI/UX Requirements ✅
- Responsive design (mobile + desktop)
- Priority colors (red=High, yellow=Medium, green=Low)
- Category badges with colors
- Task counts (total, active, completed)
- Clear completed tasks button
- Progress bar showing completion percentage

### Advanced Features ✅
- Drag and drop to reorder tasks
- Dark/light mode toggle with localStorage persistence
- Export tasks to JSON file
- Import tasks from JSON file
- Due date overdue detection

## File Structure
week-3-capstone-task-manager/
├── index.html
├── style.css
├── script.js
├── images/
└── README.md

text

## Key Functions

| Function | Purpose |
|----------|---------|
| `addTask()` | Create new task |
| `editTask()` | Modify existing task |
| `deleteTask()` | Remove task |
| `toggleComplete()` | Mark complete/incomplete |
| `renderTasks()` | Display filtered/sorted tasks |
| `getFilteredAndSortedTasks()` | Apply filters, sort, search |
| `exportTasks()` | Export to JSON |
| `importTasks()` | Import from JSON |
| `toggleTheme()` | Dark/light mode |
| `handleDragStart/Drop()` | Drag and drop reordering |

## Data Structure
```javascript
{
    id: 1744300000000,
    title: "Task title",
    description: "Task description",
    dueDate: "2026-04-15",
    priority: "high" | "medium" | "low",
    category: "personal" | "work" | "shopping" | "other",
    completed: true | false,
    createdAt: 1744300000000
}
Responsive Breakpoints
Breakpoint	Layout Changes
> 768px	Desktop: 4 stat cards, horizontal controls
< 768px	Tablet/mobile: stacked layout, 2 stat cards
Advanced Features Checklist
Drag and drop to reorder tasks

Dark/light mode toggle with localStorage

Export tasks to JSON file

Import tasks from JSON file

Progress bar showing completion percentage

Due date overdue detection