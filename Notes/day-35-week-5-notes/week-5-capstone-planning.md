# 📘 Week 5 Capstone Planning

## Project Overview

Build a complete, production-ready Interactive Todo Dashboard application demonstrating mastery of all React concepts learned in Week 5: components, state management, props, events, lists, conditional rendering, complex state updates, localStorage persistence, and custom hooks.

---

## 📋 Requirements Checklist

### Core Features

| Feature | Status | Implementation Plan |
|---------|--------|---------------------|
| Add new todo | ✅ | Form with title, description, priority, due date, category |
| Edit todo | ✅ | Inline editing mode with save/cancel |
| Delete todo | ✅ | Delete button with confirmation |
| Mark complete | ✅ | Checkbox toggle |
| Filter (All/Active/Completed) | ✅ | Filter buttons |
| Sort (date, priority, alpha) | ✅ | Sort dropdown |

### Dashboard Features

| Feature | Status | Implementation Plan |
|---------|--------|---------------------|
| Statistics dashboard | ✅ | Total, Active, Completed counts |
| Progress bar | ✅ | Visual completion percentage |
| Priority color coding | ✅ | Red=High, Yellow=Medium, Green=Low |
| Due date indicators | ✅ | Overdue, Today, Future |

### UI Requirements

| Feature | Status | Implementation Plan |
|---------|--------|---------------------|
| Clean modern design | ✅ | CSS Modules, rounded corners, shadows |
| Responsive design | ✅ | Media queries (768px, 600px) |
| Empty states | ✅ | "No tasks found" message |

### Advanced Features (Choose 6)

| Feature | Status | Implementation Plan |
|---------|--------|---------------------|
| Categories/Projects | ✅ | Work, Personal, Shopping, Health, Other |
| LocalStorage persistence | ✅ | Custom `useLocalStorage` hook |
| Search by title/description | ✅ | Real-time search input |
| Bulk delete | ✅ | Checkboxes + delete selected |
| Due date picker | ✅ | Native date input |
| Dark/Light theme toggle | ✅ | CSS variables + localStorage |
| Export/Import JSON | ✅ | Backup and restore |

---

## 🏗️ Component Architecture

### Component Tree

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

### Component Responsibilities

| Component | Props | State | Responsibilities |
|-----------|-------|-------|-------------------|
| App | none | todos, filter, sortBy, searchTerm, theme | Main state, CRUD operations, filtering, sorting |
| Header | theme, onToggleTheme | none | Title display, theme toggle |
| StatsDashboard | stats | none | Display counts and progress bar |
| TodoForm | onSubmit | formData | Add new todo |
| FilterBar | filter, onFilterChange, sortBy, onSortChange, searchTerm, onSearchChange | none | Filter, sort, search controls |
| TodoList | todos, onToggle, onUpdate, onDelete, onBulkDelete | selectedIds, selectAll | List rendering, bulk selection |
| TodoItem | todo, isSelected, onSelect, onToggle, onUpdate, onDelete | isEditing, editTitle, editDescription | Individual todo display and edit |
| ExportImport | todos, onImport | none | Export/Import JSON |
| ThemeToggle | theme, onToggle | none | Dark/light mode button |

---

## 📊 Data Structure

### Todo Object Schema

```javascript
{
  id: Number,           // Date.now() for uniqueness
  title: String,        // Required, max 100 chars
  description: String,  // Optional
  priority: String,     // 'high', 'medium', 'low'
  category: String,     // 'work', 'personal', 'shopping', 'health', 'other'
  dueDate: String,      // YYYY-MM-DD format
  completed: Boolean,   // true/false
  createdAt: String     // ISO date string
}
```

### Sample Data

```javascript
const initialTodos = [
  {
    id: 1,
    title: "Complete Week 5 Capstone",
    description: "Build the Todo Dashboard application",
    priority: "high",
    category: "work",
    dueDate: "2026-04-30",
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Review React concepts",
    description: "Practice useState, useEffect, custom hooks",
    priority: "medium",
    category: "personal",
    dueDate: "2026-04-28",
    completed: false,
    createdAt: new Date().toISOString()
  }
]
```

---

## 🎨 Design System

### CSS Variables for Theming

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
.dark {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0a0;
  --border-color: #2c3e50;
  --card-bg: #1e2a3a;
  --btn-primary: #00d4ff;
  --btn-primary-hover: #00b8e6;
}
```

### Priority Colors

| Priority | Color | Badge |
|----------|-------|-------|
| High | Red (#dc3545) | 🔴 High |
| Medium | Yellow (#ffc107) | 🟡 Medium |
| Low | Green (#28a745) | 🟢 Low |

### Category Badges

| Category | Badge |
|----------|-------|
| Work | 💼 Work |
| Personal | 👤 Personal |
| Shopping | 🛒 Shopping |
| Health | 🏃 Health |
| Other | 📌 Other |

### Due Date Status

| Status | Color | Indicator |
|--------|-------|-----------|
| Overdue | Red (#dc3545) | ⚠️ Overdue |
| Today | Orange (#fd7e14) | 🔔 Today |
| Future | Default | 📅 Future |

---

## ⚡ JavaScript Functions

### Custom Hook: useLocalStorage

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
```

### Filter, Sort, Search Logic

```javascript
const filteredAndSortedTodos = useMemo(() => {
  let result = [...todos]

  // 1. Apply status filter
  if (filter === 'active') {
    result = result.filter(todo => !todo.completed)
  } else if (filter === 'completed') {
    result = result.filter(todo => todo.completed)
  }

  // 2. Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    result = result.filter(todo =>
      todo.title.toLowerCase().includes(term) ||
      todo.description?.toLowerCase().includes(term)
    )
  }

  // 3. Apply sorting
  switch(sortBy) {
    case 'date-asc':
      result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      break
    case 'date-desc':
      result.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
      break
    case 'priority':
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      result.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
      break
    case 'alpha-asc':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'alpha-desc':
      result.sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  return result
}, [todos, filter, sortBy, searchTerm])
```

### CRUD Operations

```javascript
// Add todo
const addTodo = (newTodo) => {
  setTodos([...todos, { 
    ...newTodo, 
    id: Date.now(), 
    completed: false, 
    createdAt: new Date().toISOString() 
  }])
}

// Update todo
const updateTodo = (id, updates) => {
  setTodos(todos.map(todo => 
    todo.id === id ? { ...todo, ...updates } : todo
  ))
}

// Delete todo
const deleteTodo = (id) => {
  if (window.confirm('Delete this todo?')) {
    setTodos(todos.filter(todo => todo.id !== id))
  }
}

// Toggle complete
const toggleComplete = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}

// Bulk delete
const bulkDelete = (ids) => {
  if (window.confirm(`Delete ${ids.length} selected todos?`)) {
    setTodos(todos.filter(todo => !ids.includes(todo.id)))
  }
}
```

### Helper Functions

```javascript
// Format date for display
function formatDate(dateString) {
  if (!dateString) return 'No due date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Get due date status
function getDueDateStatus(dueDate) {
  if (!dueDate) return 'none'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)
  
  if (due < today) return 'overdue'
  if (due.getTime() === today.getTime()) return 'today'
  return 'future'
}

// Get priority color
function getPriorityColor(priority) {
  switch(priority) {
    case 'high': return '#dc3545'
    case 'medium': return '#ffc107'
    case 'low': return '#28a745'
    default: return '#6c757d'
  }
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Target | Layout Changes |
|------------|--------|----------------|
| ≤ 768px | Tablet/Mobile | Reduced padding |
| ≤ 700px | Small tablet | Filter bar stacked |
| ≤ 600px | Mobile | 2 stat cards, form stacked |

```css
@media (max-width: 768px) {
  .app { padding: 1rem; }
  .container { padding: 1rem; }
}

@media (max-width: 700px) {
  .filterBar { flex-direction: column; }
  .rightControls { width: 100%; flex-direction: column; }
}

@media (max-width: 600px) {
  .dashboard { grid-template-columns: repeat(2, 1fr); }
  .row { flex-direction: column; }
}
```

---

## 🧪 Testing Checklist

### Functional Testing
- [ ] Add new todo with all fields
- [ ] Edit todo (title, description)
- [ ] Delete todo with confirmation
- [ ] Mark todo as complete/incomplete
- [ ] Filter by All/Active/Completed
- [ ] Sort by date, priority, alphabetically
- [ ] Search by title
- [ ] Bulk select and delete
- [ ] Dark mode toggles and persists
- [ ] Export todos to JSON
- [ ] Import todos from JSON

### Data Persistence Testing
- [ ] Todos remain after page refresh
- [ ] Dark mode preference persists
- [ ] First visit shows empty state

### Responsive Testing
- [ ] Desktop (1440px+)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### Edge Cases
- [ ] Empty todo title validation
- [ ] No todos message
- [ ] No search results message
- [ ] Overdue date styling

---

## 🚀 Stretch Goals (Completed)

| Feature | Difficulty | Status |
|---------|------------|--------|
| Categories/Projects | Easy | ✅ |
| LocalStorage persistence | Medium | ✅ |
| Search functionality | Easy | ✅ |
| Bulk delete | Medium | ✅ |
| Due date picker | Easy | ✅ |
| Dark/Light theme toggle | Easy | ✅ |
| Export/Import JSON | Medium | ✅ |

---

## 🔑 Key Decisions

| Decision | Rationale |
|----------|-----------|
| `useLocalStorage` custom hook | Reusable, handles JSON automatically |
| `useMemo` for filtering/sorting | Performance optimization |
| CSS Modules for styling | Scoped styles, no conflicts |
| Dark mode with class toggle | Simple, no external dependencies |
| Inline editing vs modal | Better UX for quick edits |
| Bulk delete with checkboxes | User control over multiple items |
| Export/Import as JSON | Standard format, easy to implement |
| Priority colors | Visual hierarchy |
| Due date indicators | Helps users prioritize |
