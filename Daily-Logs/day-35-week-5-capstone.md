# 📅 Day 35: Week 5 Capstone - Interactive Todo Dashboard

**Date:** April 26, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topic:** Week 5 Capstone - Interactive Todo Dashboard

---

## 📋 Project Overview

This is the Week 5 Capstone project – a complete, production-ready Interactive Todo Dashboard application that combines everything learned in Week 5: React components, state management, props, events, lists, conditional rendering, complex state updates, localStorage persistence, and custom hooks.

---

## 🎯 Capstone Requirements Checklist

### Core Features

| Feature | Status | Implementation |
|---------|--------|----------------|
| Add new todo | ✅ | Title, description, priority, due date, category |
| Edit todo | ✅ | Inline editing with save/cancel |
| Delete todo | ✅ | Individual delete with confirmation |
| Mark complete | ✅ | Checkbox toggle |
| Filter (All/Active/Completed) | ✅ | Filter buttons with active state |
| Sort (date, priority, alphabetically) | ✅ | Sort dropdown with 5 options |
| Search by title/description | ✅ | Real-time search filtering |

### Dashboard Features

| Feature | Status | Implementation |
|---------|--------|----------------|
| Statistics dashboard | ✅ | Total, Active, Completed counts |
| Progress bar | ✅ | Visual completion percentage |
| Priority color coding | ✅ | Red=High, Yellow=Medium, Green=Low |
| Due date indicators | ✅ | Overdue (red), Today (orange), Future (green) |

### UI Requirements

| Feature | Status | Implementation |
|---------|--------|----------------|
| Clean modern design | ✅ | CSS Modules, rounded corners, shadows |
| Responsive design | ✅ | Mobile + desktop breakpoints |
| Empty states | ✅ | "No tasks found" message |
| Loading states | ✅ | N/A (localStorage is instant) |

### Advanced Features (6 implemented)

| Feature | Status | Implementation |
|---------|--------|----------------|
| Categories/Projects | ✅ | Work, Personal, Shopping, Health, Other |
| LocalStorage persistence | ✅ | Custom `useLocalStorage` hook |
| Search by title/description | ✅ | Real-time search filtering |
| Bulk delete | ✅ | Select multiple todos and delete |
| Due date picker | ✅ | Native date input |
| Dark/Light theme toggle | ✅ | CSS variables + localStorage |
| Export/Import JSON | ✅ | Backup and restore functionality |

---

## 🏗️ Component Structure

```
App
├── Header
│   └── ThemeToggle
├── StatsDashboard
├── TodoForm
├── FilterBar
├── TodoList
│   └── TodoItem
└── ExportImport
```

---

## 📝 Component Details

### App.jsx
- Main container component
- Manages global state with `useLocalStorage`
- Handles all CRUD operations
- Filters and sorts todos with `useMemo`
- Passes props to child components

### Header.jsx
- Displays app title and subtitle
- Contains theme toggle button

### StatsDashboard.jsx
- Displays total, active, completed counts
- Shows progress bar with percentage

### TodoForm.jsx
- Form for adding new todos
- Fields: title, description, priority, category, due date
- Controlled component with useState

### FilterBar.jsx
- Filter buttons (All, Active, Completed)
- Search input (debounced in parent)
- Sort dropdown (5 sorting options)

### TodoList.jsx
- Renders list of TodoItem components
- Handles bulk selection
- Shows empty state when no todos

### TodoItem.jsx
- Individual todo display
- Inline editing functionality
- Priority badge with color
- Category badge
- Due date with status indicator
- Delete button

### ExportImport.jsx
- Export todos as JSON file
- Import todos from JSON file

---

## 🎨 CSS Features

### CSS Modules
- Scoped styles for each component
- No class name conflicts

### Dark/Light Theme
```css
.app.dark {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.app.dark .container {
  background: #1e2a3a;
  color: #e0e0e0;
}
```

### Priority Colors
```css
.priority-high { background: #dc3545; }
.priority-medium { background: #ffc107; }
.priority-low { background: #28a745; }
```

### Due Date Indicators
```css
.overdue { color: #dc3545; }
.today { color: #fd7e14; }
```

### Responsive Breakpoints
- Desktop: 4 stat cards, horizontal layout
- Tablet (768px): Adjusted padding
- Mobile (600px): 2 stat cards, stacked controls

---

## ⚡ JavaScript Features

### Custom Hook: useLocalStorage

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
```

### Filter, Sort, Search with useMemo

```javascript
const filteredAndSortedTodos = useMemo(() => {
  let result = [...todos]

  // Filter by status
  if (filter === 'active') {
    result = result.filter(todo => !todo.completed)
  } else if (filter === 'completed') {
    result = result.filter(todo => todo.completed)
  }

  // Filter by search
  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    result = result.filter(todo =>
      todo.title.toLowerCase().includes(term) ||
      todo.description?.toLowerCase().includes(term)
    )
  }

  // Sort
  switch(sortBy) {
    case 'date-asc':
      result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      break
    case 'priority':
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      result.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
      break
    // ... other sort options
  }

  return result
}, [todos, filter, sortBy, searchTerm])
```

### CRUD Operations

```javascript
// Add todo
const addTodo = (newTodo) => {
  setTodos([...todos, { ...newTodo, id: Date.now(), completed: false }])
}

// Update todo
const updateTodo = (id, updates) => {
  setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo))
}

// Delete todo
const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id))
}

// Toggle complete
const toggleComplete = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}

// Bulk delete
const bulkDelete = (ids) => {
  setTodos(todos.filter(todo => !ids.includes(todo.id)))
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| > 768px | Desktop layout, 4 stat cards |
| ≤ 768px | Reduced padding |
| ≤ 700px | Filter bar stacked vertically |
| ≤ 600px | 2 stat cards, form stacked |

---

## 📊 Data Structure

```javascript
{
  id: Number,           // Date.now()
  title: String,        // Required
  description: String,  // Optional
  priority: String,     // 'high', 'medium', 'low'
  category: String,     // 'work', 'personal', 'shopping', 'health', 'other'
  dueDate: String,      // YYYY-MM-DD
  completed: Boolean,
  createdAt: String     // ISO date string
}
```

---

## ✅ Day 35 Checklist

- [x] Plan component tree and state structure
- [x] Create Header component with theme toggle
- [x] Create StatsDashboard with progress bar
- [x] Create TodoForm for adding todos
- [x] Create FilterBar with filter, sort, search
- [x] Create TodoList and TodoItem components
- [x] Implement all CRUD operations
- [x] Add localStorage persistence with custom hook
- [x] Add dark/light theme toggle
- [x] Add bulk delete functionality
- [x] Add export/import JSON functionality
- [x] Add due date indicators (overdue/today)
- [x] Add priority color coding
- [x] Add categories for todos
- [x] Make fully responsive
- [x] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Custom hooks** like `useLocalStorage` make code reusable and clean
2. **useMemo** optimizes expensive calculations (filtering, sorting)
3. **CSS Modules** provide scoped styling without conflicts
4. **Dark mode with CSS variables** is clean and maintainable
5. **Bulk operations** (delete, select all) improve UX
6. **Export/Import JSON** gives users data control
7. **Priority colors** and **due date indicators** enhance visual feedback
8. **Categories** help organize todos better

