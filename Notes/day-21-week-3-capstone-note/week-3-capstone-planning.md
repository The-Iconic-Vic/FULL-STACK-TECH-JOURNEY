# 📘 Week 3 Capstone Planning

## Project Overview

Build a complete, production-ready Personal Task Management Application that demonstrates mastery of all skills learned in Weeks 1-3.

---

## 📋 Requirements Checklist

### Core Features

| Feature | Status | Implementation Plan |
|---------|--------|---------------------|
| Add tasks | ✅ | Form with title, description, due date, priority, category |
| Edit tasks | ✅ | Prompt or inline editing |
| Delete tasks | ✅ | Delete button with confirmation |
| Mark complete | ✅ | Checkbox to toggle status |
| Filter (All/Active/Completed) | ✅ | Filter buttons |
| Sort (date, priority, alpha) | ✅ | Sort dropdown |

### Data Persistence

| Feature | Status | Implementation Plan |
|---------|--------|---------------------|
| localStorage save | ✅ | Save on every change |
| localStorage load | ✅ | Load on page refresh |
| Default demo data | ✅ | First-visit initialization |

### UI/UX Requirements

| Feature | Status | Implementation Plan |
|---------|--------|---------------------|
| Responsive design | ✅ | Media queries (768px breakpoint) |
| Priority colors | ✅ | Red=High, Yellow=Medium, Green=Low |
| Task counters | ✅ | Total, Active, Completed |
| Clear completed | ✅ | Button to remove completed tasks |
| Search by title | ✅ | Real-time search input |

### Advanced Features (Choose 3+)

| Feature | Status | Implementation Plan |
|---------|--------|---------------------|
| Drag and drop reorder | ✅ | HTML5 Drag-and-Drop API |
| Dark/light mode | ✅ | CSS variables + localStorage |
| Export to JSON | ✅ | Download file |
| Import from JSON | ✅ | Upload file |
| Progress bar | ✅ | Completion percentage |
| Overdue detection | ✅ | Red styling for past due dates |
| Categories | ✅ | Work, Personal, Shopping, Other |

---

## 🏗️ Architecture Planning

### File Structure
```
week-3-capstone-task-manager/
├── index.html          # Main HTML file
├── style.css           # All styles (light/dark, responsive)
├── script.js           # All JavaScript
├── images/             # Image assets (optional)
└── README.md           # Documentation
```

### HTML Section Breakdown

| Section | ID/Class | Key Elements |
|---------|----------|--------------|
| Header | `header` | Title, tagline, theme toggle |
| Add Task | `.add-task-section` | Title input, description textarea, due date, priority select, category select |
| Controls | `.controls-section` | Search input, sort select, filter buttons, clear completed |
| Stats | `.stats-section` | Total count, active count, completed count, progress bar |
| Tasks List | `#tasks-container` | Dynamic task cards |
| Data Actions | `.data-actions` | Export button, import file input |

---

## 📊 Data Structure

### Task Object Schema
```javascript
{
    id: Number,           // Date.now() for unique ID
    title: String,        // Required
    description: String,  // Optional
    dueDate: String,      // YYYY-MM-DD format
    priority: String,     // 'high', 'medium', 'low'
    category: String,     // 'personal', 'work', 'shopping', 'other'
    completed: Boolean,   // true/false
    createdAt: Number     // Timestamp for default sort
}
```

### Sample Data
```javascript
const defaultTasks = [
    {
        id: 1,
        title: "Complete Week 3 Capstone",
        description: "Build the Task Manager app",
        dueDate: "2026-04-15",
        priority: "high",
        category: "work",
        completed: false,
        createdAt: Date.now()
    },
    {
        id: 2,
        title: "Buy groceries",
        description: "Milk, eggs, bread",
        dueDate: "2026-04-12",
        priority: "medium",
        category: "shopping",
        completed: false,
        createdAt: Date.now()
    }
];
```

---

## 🎨 Design System

### CSS Variables (Light/Dark Themes)

```css
/* Light Theme (default) */
:root {
    --bg-primary: #f8f9fa;
    --bg-secondary: #ffffff;
    --text-primary: #333333;
    --text-secondary: #666666;
    --border-color: #e0e0e0;
    --card-bg: #ffffff;
    --btn-primary: #667eea;
    --btn-primary-hover: #5a67d8;
    --priority-high: #dc3545;
    --priority-medium: #ffc107;
    --priority-low: #28a745;
}

/* Dark Theme */
body.dark-mode {
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0a0;
    --border-color: #2c3e50;
    --card-bg: #1e2a3a;
    --btn-primary: #00d4ff;
}
```

### Priority Colors
| Priority | Color | Badge |
|----------|-------|-------|
| High | Red (#dc3545) | 🔴 High |
| Medium | Yellow (#ffc107) | 🟡 Medium |
| Low | Green (#28a745) | 🟢 Low |

### Category Colors
| Category | Color |
|----------|-------|
| Personal | Teal (#17a2b8) |
| Work | Purple (#6f42c1) |
| Shopping | Orange (#fd7e14) |
| Other | Gray (#6c757d) |

---

## ⚡ JavaScript Functions

### Core Functions
| Function | Purpose | Dependencies |
|----------|---------|--------------|
| `saveToLocalStorage()` | Save tasks to localStorage | - |
| `loadFromLocalStorage()` | Load tasks from localStorage | `saveToLocalStorage()` |
| `renderTasks()` | Display tasks in DOM | `getFilteredAndSortedTasks()`, `updateStats()` |
| `getFilteredAndSortedTasks()` | Apply filter, sort, search | - |
| `updateStats()` | Update counters and progress bar | - |

### CRUD Functions
| Function | Purpose | Calls |
|----------|---------|-------|
| `addTask()` | Create new task | `saveToLocalStorage()`, `renderTasks()` |
| `editTask(id)` | Update existing task | `saveToLocalStorage()`, `renderTasks()` |
| `deleteTask(id)` | Remove task | `saveToLocalStorage()`, `renderTasks()` |
| `toggleComplete(id)` | Toggle completion status | `saveToLocalStorage()`, `renderTasks()` |
| `clearCompleted()` | Remove all completed tasks | `saveToLocalStorage()`, `renderTasks()` |

### Advanced Functions
| Function | Purpose |
|----------|---------|
| `handleDragStart()` | Start drag operation |
| `handleDrop()` | Complete drag and drop reorder |
| `exportTasks()` | Download tasks as JSON |
| `importTasks(file)` | Upload and merge tasks |
| `toggleTheme()` | Switch light/dark mode |
| `isOverdue(dueDate)` | Check if task is past due |

---

## 🔧 Filter, Sort, Search Logic

```javascript
function getFilteredAndSortedTasks() {
    let filtered = [...tasks];
    
    // 1. Apply status filter
    if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }
    
    // 2. Apply search filter
    if (currentSearchTerm) {
        const term = currentSearchTerm.toLowerCase();
        filtered = filtered.filter(t => t.title.toLowerCase().includes(term));
    }
    
    // 3. Apply sorting
    switch(currentSort) {
        case 'date-asc':
            filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
        case 'date-desc':
            filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
            break;
        case 'priority':
            const order = { high: 3, medium: 2, low: 1 };
            filtered.sort((a, b) => order[b.priority] - order[a.priority]);
            break;
        case 'alpha-asc':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'alpha-desc':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }
    
    return filtered;
}
```

---

## 🎯 Drag and Drop Implementation

```javascript
let dragSourceIndex = null;

function handleDragStart(e) {
    const card = e.target.closest('.task-card');
    dragSourceIndex = Array.from(tasksContainer.children).indexOf(card);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const targetCard = e.target.closest('.task-card');
    if (targetCard && dragSourceIndex !== null) {
        const targetIndex = Array.from(tasksContainer.children).indexOf(targetCard);
        
        // Get the actual task objects
        const filteredTasks = getFilteredAndSortedTasks();
        const draggedTask = filteredTasks[dragSourceIndex];
        const targetTask = filteredTasks[targetIndex];
        
        // Find indices in original tasks array
        const sourceIdx = tasks.findIndex(t => t.id === draggedTask.id);
        const targetIdx = tasks.findIndex(t => t.id === targetTask.id);
        
        // Reorder
        const [moved] = tasks.splice(sourceIdx, 1);
        tasks.splice(targetIdx, 0, moved);
        
        saveToLocalStorage();
        renderTasks();
    }
    dragSourceIndex = null;
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Target | Layout Changes |
|------------|--------|----------------|
| > 768px | Desktop | 4 stat cards, horizontal form row |
| ≤ 768px | Tablet/Mobile | 2 stat cards, stacked form, stacked controls |

```css
@media (max-width: 768px) {
    .stats-section {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .controls-section {
        flex-direction: column;
    }
    
    .form-row {
        flex-direction: column;
    }
    
    .task-card {
        flex-wrap: wrap;
    }
}
```

---

## 🧪 Testing Checklist

### Functional Testing
- [ ] Add new task with all fields
- [ ] Edit task title and description
- [ ] Delete task with confirmation
- [ ] Toggle task completion
- [ ] Filter by All/Active/Completed
- [ ] Sort by date, priority, alphabetically
- [ ] Search by title
- [ ] Clear completed tasks
- [ ] Drag and drop reorder
- [ ] Dark mode toggle persists
- [ ] Export tasks to JSON
- [ ] Import tasks from JSON

### Data Persistence Testing
- [ ] Tasks remain after page refresh
- [ ] Dark mode preference persists
- [ ] First visit shows demo data

### Responsive Testing
- [ ] Desktop (1440px+)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### Edge Cases
- [ ] Empty task title validation
- [ ] No tasks message
- [ ] No search results message
- [ ] Overdue date styling

---

## 📚 Resources Used

- MDN Web Docs (Drag and Drop API, localStorage)
- CSS-Tricks (Flexbox, Grid guides)
- Google Fonts / System fonts
- Emojis for icons

---

## 🔑 Key Decisions

| Decision | Rationale |
|----------|-----------|
| CSS Variables for theming | Easy dark mode switching |
| Separate filter/sort/search | Clean separation of concerns |
| Drag and Drop API | Native browser support, no external libraries |
| Export/Import as JSON | Simple, standard format |
| Task object with createdAt | Default sorting by creation date |
| Overdue detection on render | Real-time visual feedback |
| Prompt for editing | Simple, no modal complexity |

---

## 🚀 Stretch Goals (Completed)

| Feature | Difficulty | Status |
|---------|------------|--------|
| Drag and drop reorder | Medium | ✅ |
| Dark/light mode toggle | Easy | ✅ |
| Export to JSON file | Easy | ✅ |
| Import from JSON file | Medium | ✅ |
| Progress bar | Easy | ✅ |
| Overdue date detection | Easy | ✅ |
| Category badges | Easy | ✅ |

