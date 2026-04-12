// ============================================
// TASK MANAGER APPLICATION
// Week 3 Capstone Project
// ============================================

// ============================================
// DATA STRUCTURE
// ============================================
let tasks = [];
let currentFilter = 'all';
let currentSort = 'date-asc';
let currentSearchTerm = '';
let dragSourceIndex = null;

// DOM Elements
const tasksContainer = document.getElementById('tasks-container');
const addBtn = document.getElementById('add-task-btn');
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');
const taskDue = document.getElementById('task-due');
const taskPriority = document.getElementById('task-priority');
const taskCategory = document.getElementById('task-category');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const themeToggle = document.getElementById('theme-toggle');
const exportBtn = document.getElementById('export-btn');
const importFile = document.getElementById('import-file');

// Stats Elements
const totalCountSpan = document.getElementById('total-count');
const activeCountSpan = document.getElementById('active-count');
const completedCountSpan = document.getElementById('completed-count');
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');

// ============================================
// LOCALSTORAGE FUNCTIONS
// ============================================
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    } else {
        // Demo data
        tasks = [
            { id: 1, title: 'Complete Week 3 Capstone', description: 'Build the Task Manager app', dueDate: '2026-04-15', priority: 'high', category: 'work', completed: false, createdAt: Date.now() },
            { id: 2, title: 'Buy groceries', description: 'Milk, eggs, bread', dueDate: '2026-04-12', priority: 'medium', category: 'shopping', completed: false, createdAt: Date.now() },
            { id: 3, title: 'Review JavaScript concepts', description: 'Practice array methods', dueDate: '2026-04-10', priority: 'low', category: 'personal', completed: true, createdAt: Date.now() }
        ];
        saveToLocalStorage();
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function formatDate(dateString) {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function isOverdue(dueDate) {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return due < today;
}

function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    totalCountSpan.textContent = total;
    activeCountSpan.textContent = active;
    completedCountSpan.textContent = completed;
    progressFill.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}% Complete`;
}

// ============================================
// FILTER, SORT, SEARCH
// ============================================
function getFilteredAndSortedTasks() {
    let filtered = [...tasks];
    
    // Filter by status
    if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }
    
    // Filter by search term
    if (currentSearchTerm) {
        const term = currentSearchTerm.toLowerCase();
        filtered = filtered.filter(t => t.title.toLowerCase().includes(term));
    }
    
    // Sort
    switch(currentSort) {
        case 'date-asc':
            filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
        case 'date-desc':
            filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
            break;
        case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
            break;
        case 'alpha-asc':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'alpha-desc':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            filtered.sort((a, b) => b.createdAt - a.createdAt);
    }
    
    return filtered;
}

// ============================================
// RENDER TASKS
// ============================================
function renderTasks() {
    const filteredTasks = getFilteredAndSortedTasks();
    
    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = '<div class="empty-state">No tasks found.</div>';
        updateStats();
        return;
    }
    
    tasksContainer.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.completed ? 'completed' : ''}`;
        taskCard.setAttribute('data-id', task.id);
        taskCard.setAttribute('draggable', true);
        taskCard.setAttribute('data-index', index);
        
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-check';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(task.id));
        
        // Content container
        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-content';
        
        const titleSpan = document.createElement('div');
        titleSpan.className = 'task-title';
        titleSpan.textContent = task.title;
        
        const descDiv = document.createElement('div');
        descDiv.className = 'task-desc';
        descDiv.textContent = task.description || '';
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'task-meta';
        
        const prioritySpan = document.createElement('span');
        prioritySpan.className = `priority-badge priority-${task.priority}`;
        prioritySpan.textContent = task.priority === 'high' ? '🔴 High' : task.priority === 'medium' ? '🟡 Medium' : '🟢 Low';
        
        const categorySpan = document.createElement('span');
        categorySpan.className = `category-badge category-${task.category}`;
        const categoryNames = { personal: '👤 Personal', work: '💼 Work', shopping: '🛒 Shopping', other: '📌 Other' };
        categorySpan.textContent = categoryNames[task.category] || task.category;
        
        const dueSpan = document.createElement('span');
        dueSpan.className = `due-date ${isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}`;
        dueSpan.textContent = task.dueDate ? `📅 ${formatDate(task.dueDate)}` : '📅 No due date';
        
        metaDiv.appendChild(prioritySpan);
        metaDiv.appendChild(categorySpan);
        metaDiv.appendChild(dueSpan);
        
        contentDiv.appendChild(titleSpan);
        if (task.description) contentDiv.appendChild(descDiv);
        contentDiv.appendChild(metaDiv);
        
        // Action buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '✏️';
        editBtn.addEventListener('click', () => editTask(task.id));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        
        taskCard.appendChild(checkbox);
        taskCard.appendChild(contentDiv);
        taskCard.appendChild(actionsDiv);
        
        // Drag and drop events
        taskCard.addEventListener('dragstart', handleDragStart);
        taskCard.addEventListener('dragover', handleDragOver);
        taskCard.addEventListener('drop', handleDrop);
        
        tasksContainer.appendChild(taskCard);
    });
    
    updateStats();
}

// ============================================
// CRUD OPERATIONS
// ============================================
function addTask() {
    const title = taskTitle.value.trim();
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        title: title,
        description: taskDesc.value.trim(),
        dueDate: taskDue.value,
        priority: taskPriority.value,
        category: taskCategory.value,
        completed: false,
        createdAt: Date.now()
    };
    
    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();
    
    // Clear form
    taskTitle.value = '';
    taskDesc.value = '';
    taskDue.value = '';
    taskPriority.value = 'medium';
    taskCategory.value = 'personal';
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveToLocalStorage();
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const newTitle = prompt('Edit task title:', task.title);
    if (newTitle && newTitle.trim()) {
        task.title = newTitle.trim();
        const newDesc = prompt('Edit description:', task.description || '');
        task.description = newDesc !== null ? newDesc.trim() : task.description;
        const newPriority = prompt('Set priority (high/medium/low):', task.priority);
        if (newPriority && ['high', 'medium', 'low'].includes(newPriority.toLowerCase())) {
            task.priority = newPriority.toLowerCase();
        }
        saveToLocalStorage();
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveToLocalStorage();
        renderTasks();
    }
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveToLocalStorage();
    renderTasks();
}

// ============================================
// DRAG AND DROP
// ============================================
function handleDragStart(e) {
    const card = e.target.closest('.task-card');
    if (card) {
        dragSourceIndex = Array.from(tasksContainer.children).indexOf(card);
        e.dataTransfer.effectAllowed = 'move';
    }
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
        if (dragSourceIndex !== targetIndex) {
            const filteredTasks = getFilteredAndSortedTasks();
            const draggedTask = filteredTasks[dragSourceIndex];
            const actualTask = tasks.find(t => t.id === draggedTask.id);
            const targetTask = filteredTasks[targetIndex];
            const actualTarget = tasks.find(t => t.id === targetTask.id);
            
            const sourceIdx = tasks.findIndex(t => t.id === actualTask.id);
            const targetIdx = tasks.findIndex(t => t.id === actualTarget.id);
            
            if (sourceIdx !== -1 && targetIdx !== -1) {
                const [moved] = tasks.splice(sourceIdx, 1);
                tasks.splice(targetIdx, 0, moved);
                saveToLocalStorage();
                renderTasks();
            }
        }
    }
    dragSourceIndex = null;
}

// ============================================
// EXPORT / IMPORT
// ============================================
function exportTasks() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importTasks(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                tasks = imported;
                saveToLocalStorage();
                renderTasks();
                alert('Tasks imported successfully!');
            } else {
                alert('Invalid file format');
            }
        } catch (err) {
            alert('Error parsing JSON file');
        }
    };
    reader.readAsText(file);
}

// ============================================
// DARK MODE
// ============================================
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙 Dark Mode';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// ============================================
// EVENT LISTENERS
// ============================================
addBtn.addEventListener('click', addTask);
clearCompletedBtn.addEventListener('click', clearCompleted);
themeToggle.addEventListener('click', toggleTheme);
exportBtn.addEventListener('click', exportTasks);
importFile.addEventListener('change', (e) => {
    if (e.target.files[0]) importTasks(e.target.files[0]);
    e.target.value = '';
});

searchInput.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value;
    renderTasks();
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderTasks();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Enter key to add task
taskTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// ============================================
// INITIALIZATION
// ============================================
loadFromLocalStorage();
loadTheme();
renderTasks();