# 📅 Day 21: Week 3 Capstone - Personal Task Manager

**Date:** April 12, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topic:** Week 3 Capstone - Personal Task Management Application

---

## 📋 Project Overview

This is the Week 3 Capstone project – a complete, production-ready Personal Task Management application that combines everything learned in Week 3 (Advanced DOM manipulation, Events, localStorage, Dates/Timers, Drag-and-Drop) with skills from previous weeks.

---

## 🎯 Capstone Requirements Checklist

### Core Features

| Feature | Status | Implementation |
|---------|--------|----------------|
| Add new tasks | ✅ | Title, description, due date, priority, category |
| Edit existing tasks | ✅ | Prompt-based editing |
| Delete tasks | ✅ | Individual deletion with confirmation |
| Mark tasks complete/incomplete | ✅ | Checkbox toggle |
| Filter tasks (All/Active/Completed) | ✅ | Filter buttons with visual active state |
| Sort tasks (date, priority, alphabetically) | ✅ | Sort dropdown with 5 options |

### Data Persistence

| Feature | Status | Implementation |
|---------|--------|----------------|
| Save to localStorage | ✅ | `localStorage.setItem('tasks', JSON.stringify(tasks))` |
| Load on page refresh | ✅ | `localStorage.getItem('tasks')` on load |
| Demo data on first visit | ✅ | Default tasks for new users |

### UI/UX Requirements

| Feature | Status | Implementation |
|---------|--------|----------------|
| Responsive design | ✅ | Media queries (768px breakpoint) |
| Priority color indicators | ✅ | Red=High, Yellow=Medium, Green=Low |
| Task counts | ✅ | Total, Active, Completed counters |
| Clear completed button | ✅ | Removes all completed tasks |
| Search by title | ✅ | Real-time search filtering |

### Advanced Features (6 implemented)

| Feature | Status | Implementation |
|---------|--------|----------------|
| Drag and drop reorder | ✅ | HTML5 Drag-and-Drop API |
| Dark/light mode toggle | ✅ | CSS variables + localStorage |
| Export tasks to JSON | ✅ | Download as .json file |
| Import tasks from JSON | ✅ | Upload and merge tasks |
| Progress bar | ✅ | Shows completion percentage |
| Due date overdue detection | ✅ | Red styling for overdue tasks |

---

## 🏗️ Project Structure

```
week-3-capstone-task-manager/
├── index.html          # Main HTML file
├── style.css           # All styles (light/dark themes, responsive)
├── script.js           # All JavaScript (CRUD, filters, drag-drop, export/import)
├── images/             # Image assets (if any)
└── README.md           # Project documentation
```

---

## 📝 HTML Sections

| Section | Content |
|---------|---------|
| Header | Title, tagline, theme toggle |
| Add Task | Form with title, description, due date, priority, category |
| Controls | Search input, sort dropdown, filter buttons, clear completed |
| Stats | Total, Active, Completed counters + progress bar |
| Tasks List | Dynamic task cards with all task data |
| Data Actions | Export JSON, Import JSON buttons |

---

## 🎨 CSS Features

### CSS Variables for Theming
```css
:root {
    --bg-primary: #f8f9fa;
    --text-primary: #333333;
    --btn-primary: #667eea;
}

body.dark-mode {
    --bg-primary: #1a1a2e;
    --text-primary: #e0e0e0;
    --btn-primary: #00d4ff;
}
```

### Priority Colors
```css
.priority-high { background: #dc3545; }  /* Red */
.priority-medium { background: #ffc107; } /* Yellow */
.priority-low { background: #28a745; }   /* Green */
```

### Category Badges
```css
.category-personal { background: #17a2b8; }
.category-work { background: #6f42c1; }
.category-shopping { background: #fd7e14; }
.category-other { background: #6c757d; }
```

### Responsive Grid
```css
.stats-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}

@media (max-width: 768px) {
    .stats-section {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

---

## ⚡ JavaScript Features

### Data Structure
```javascript
{
    id: 1744300000000,
    title: "Complete Week 3 Capstone",
    description: "Build the Task Manager app",
    dueDate: "2026-04-15",
    priority: "high" | "medium" | "low",
    category: "personal" | "work" | "shopping" | "other",
    completed: true | false,
    createdAt: 1744300000000
}
```

### 1. CRUD Operations
```javascript
function addTask() { /* Create */ }
function editTask(id) { /* Update */ }
function deleteTask(id) { /* Delete */ }
function toggleComplete(id) { /* Toggle status */ }
```

### 2. Filter, Sort, Search
```javascript
function getFilteredAndSortedTasks() {
    let filtered = [...tasks];
    
    // Filter by status
    if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
    if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);
    
    // Filter by search term
    if (currentSearchTerm) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(currentSearchTerm));
    }
    
    // Sort
    switch(currentSort) {
        case 'date-asc': filtered.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate)); break;
        case 'priority': // priority order logic
        case 'alpha-asc': filtered.sort((a,b) => a.title.localeCompare(b.title)); break;
    }
    
    return filtered;
}
```

### 3. Drag and Drop
```javascript
function handleDragStart(e) {
    dragSourceIndex = Array.from(tasksContainer.children).indexOf(e.target.closest('.task-card'));
}

function handleDrop(e) {
    // Reorder tasks array based on drag and drop
    const [moved] = tasks.splice(sourceIdx, 1);
    tasks.splice(targetIdx, 0, moved);
    saveToLocalStorage();
    renderTasks();
}
```

### 4. Export/Import
```javascript
function exportTasks() {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

function importTasks(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        tasks = JSON.parse(e.target.result);
        saveToLocalStorage();
        renderTasks();
    };
    reader.readAsText(file);
}
```

### 5. Dark Mode with Persistence
```javascript
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

### 6. Progress Bar
```javascript
const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
progressFill.style.width = `${percent}%`;
progressPercent.textContent = `${percent}% Complete`;
```

### 7. Overdue Detection
```javascript
function isOverdue(dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return due < today;
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Behavior |
|------------|-----------------|
| > 768px | Desktop: 4 stat cards, horizontal form row, side-by-side controls |
| ≤ 768px | Tablet/mobile: 2 stat cards, stacked form, stacked controls |

---

## 🧠 Skills Demonstrated

### HTML
- Semantic structure
- Forms with various input types
- File input for import

### CSS
- CSS Variables for theming
- CSS Grid for stats section
- Flexbox for controls and cards
- Media queries for responsiveness
- Custom color coding for priorities and categories

### JavaScript
- CRUD operations
- Array methods (filter, sort, find, map)
- LocalStorage for persistence
- Drag and Drop API
- File API for export/import
- Event delegation
- Date manipulation and formatting
- Dynamic DOM rendering

---

## ✅ Day 21 Checklist

- [x] Plan project features and structure
- [x] Build semantic HTML structure
- [x] Create responsive CSS with light/dark themes
- [x] Implement task CRUD operations
- [x] Add filter, sort, and search functionality
- [x] Implement localStorage persistence
- [x] Add drag and drop reordering
- [x] Add export/import JSON functionality
- [x] Add dark/light mode toggle
- [x] Add progress bar for completion percentage
- [x] Add overdue date detection
- [x] Test on multiple screen sizes
- [x] Push to GitHub

---

## 🔑 Key Takeaways

1. **LocalStorage is essential for user data** — tasks persist across sessions
2. **CSS Variables make theming simple** — just change variable values for dark mode
3. **Filter, sort, search should be combined** into a single function for maintainability
4. **Drag and Drop API requires careful index management** — especially with filtered lists
5. **Export/Import provides data portability** — users can backup and restore data
6. **Progress bars give visual feedback** — motivates users to complete tasks
7. **Overdue detection helps users prioritize** — visual indicator for late tasks
8. **Responsive design is non-negotiable** — mobile users need full functionality

---

## 🚀 Future Enhancements

- [ ] Add subtasks within main tasks
- [ ] Add push notifications for due dates
- [ ] Add recurring tasks
- [ ] Add tags/labels beyond categories
- [ ] Add calendar view
- [ ] Sync across devices (requires backend)
- [ ] Add task sharing/collaboration
