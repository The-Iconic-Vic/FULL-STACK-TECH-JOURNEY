# 📚 Day 21 Resources - Week 3 Capstone

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Drag and Drop API | https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API |
| MDN: localStorage | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage |
| MDN: File API | https://developer.mozilla.org/en-US/docs/Web/API/File_API |
| MDN: Blob | https://developer.mozilla.org/en-US/docs/Web/API/Blob |
| MDN: CSS Variables | https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties |
| MDN: Grid Layout | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout |
| MDN: Flexbox | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout |
| MDN: Media Queries | https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Build a Task Manager App | https://youtu.be/2wCpkOk2uCg |
| Drag and Drop Tutorial | https://youtu.be/3KJI1WZGDrg |
| localStorage Tutorial | https://youtu.be/auMcR9Y4Qxg |
| Dark Mode with CSS Variables | https://youtu.be/6NtNy28wIos |
| Export/Import JSON | https://youtu.be/6I3YqWw2OB4 |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools | Debugging, testing | Built into Chrome |
| JSON Formatter | View exported JSON | https://jsonformatter.org |
| Coolors | Color palette generator | https://coolors.co |
| CSS Gradient Generator | Gradient backgrounds | https://cssgradient.io |
| Responsive Design Checker | Test responsiveness | https://responsivedesignchecker.com |

## 📝 Project Checklist

### Core Features
- [ ] Add new tasks (title, description, due date, priority, category)
- [ ] Edit existing tasks
- [ ] Delete tasks with confirmation
- [ ] Mark tasks as complete/incomplete
- [ ] Filter: All, Active, Completed
- [ ] Sort: by date, priority, alphabetically
- [ ] Search by title

### Data Persistence
- [ ] Save tasks to localStorage
- [ ] Load tasks on page refresh
- [ ] First-visit demo data

### UI/UX
- [ ] Responsive design (mobile + desktop)
- [ ] Priority colors (red, yellow, green)
- [ ] Category badges
- [ ] Task counters (total, active, completed)
- [ ] Clear completed button
- [ ] Progress bar

### Advanced Features (Choose 3+)
- [ ] Drag and drop reorder
- [ ] Dark/light mode toggle
- [ ] Export to JSON
- [ ] Import from JSON
- [ ] Due date reminders/overdue detection
- [ ] Subtasks
- [ ] Categories/Projects

## ✅ Common Code Patterns

### localStorage Pattern
```javascript
// Save
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load
function loadData(key, defaultValue = []) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
}
```

### Drag and Drop Pattern
```javascript
element.setAttribute('draggable', true);
element.addEventListener('dragstart', handleDragStart);
element.addEventListener('dragover', handleDragOver);
element.addEventListener('drop', handleDrop);
```

### Export JSON Pattern
```javascript
function exportData(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
```

### Import JSON Pattern
```javascript
function importData(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            callback(data);
        } catch (err) {
            alert('Invalid JSON file');
        }
    };
    reader.readAsText(file);
}
```

### Dark Mode Pattern
```javascript
// CSS Variables
:root { --bg: white; --text: black; }
body.dark { --bg: black; --text: white; }

// Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// Load preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
```

### Filter/Sort/Search Pattern
```javascript
function getFilteredData(data, filters) {
    let result = [...data];
    
    // Filter
    if (filters.status === 'active') {
        result = result.filter(item => !item.completed);
    }
    
    // Search
    if (filters.searchTerm) {
        result = result.filter(item => 
            item.title.toLowerCase().includes(filters.searchTerm)
        );
    }
    
    // Sort
    result.sort((a, b) => {
        if (filters.sortBy === 'date') return new Date(a.date) - new Date(b.date);
        if (filters.sortBy === 'priority') return priorityOrder[b.priority] - priorityOrder[a.priority];
        return 0;
    });
    
    return result;
}
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Drag and drop not working | Missing draggable attribute | Add `draggable="true"` |
| localStorage data lost | Using sessionStorage | Use localStorage instead |
| JSON parse error | Invalid JSON format | Use try/catch |
| Dark mode not persisting | Not saving to localStorage | Save preference on toggle |
| Filter not updating | Not re-rendering | Call render after filter change |
| Sort not working | Compare function incorrect | Test sort logic separately |
| Progress bar not updating | Math calculation error | Check division by zero |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Advanced Drag and Drop | https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations |
| IndexedDB (advanced storage) | https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API |
| Service Workers (offline support) | https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API |
| Progressive Web Apps | https://web.dev/progressive-web-apps/ |
