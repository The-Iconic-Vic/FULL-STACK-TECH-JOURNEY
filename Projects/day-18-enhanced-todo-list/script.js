// ============================================
// ENHANCED TODO LIST WITH LOCALSTORAGE
// Demonstrating: setItem, getItem, JSON.stringify, JSON.parse
// ============================================

// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const totalCountSpan = document.getElementById('total-count');
const activeCountSpan = document.getElementById('active-count');
const completedCountSpan = document.getElementById('completed-count');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Todo items array
let todos = [];

// Current filter
let currentFilter = 'all';

// ============================================
// LOCALSTORAGE FUNCTIONS
// ============================================

// Save todos to localStorage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from localStorage
function loadFromLocalStorage() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    } else {
        // Default demo data for first visit
        todos = [
            { id: 1, text: 'Learn localStorage', completed: false },
            { id: 2, text: 'Build a persistent todo app', completed: false },
            { id: 3, text: 'Master JSON.stringify()', completed: true }
        ];
        saveToLocalStorage();
    }
    renderTodoList();
}

// Clear all data from localStorage
function clearAllData() {
    if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
        todos = [];
        saveToLocalStorage();
        renderTodoList();
    }
}

// ============================================
// CREATE TODO ELEMENT
// ============================================
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', todo.id);
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleComplete(todo.id));
    
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => editTodo(todo.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    return li;
}

// ============================================
// RENDER TODO LIST
// ============================================
function renderTodoList() {
    todoList.innerHTML = '';
    
    let filteredTodos = [...todos];
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }
    
    if (filteredTodos.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty-message';
        emptyLi.textContent = 'No tasks to display.';
        todoList.appendChild(emptyLi);
        updateStats();
        return;
    }
    
    filteredTodos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
    
    updateStats();
}

// ============================================
// UPDATE STATISTICS
// ============================================
function updateStats() {
    const total = todos.length;
    const active = todos.filter(todo => !todo.completed).length;
    const completed = todos.filter(todo => todo.completed).length;
    
    totalCountSpan.textContent = total;
    activeCountSpan.textContent = active;
    completedCountSpan.textContent = completed;
}

// ============================================
// CRUD OPERATIONS (with auto-save)
// ============================================
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    todos.push(newTodo);
    saveToLocalStorage();  // Save after change
    todoInput.value = '';
    renderTodoList();
    todoInput.focus();
}

function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage();  // Save after change
        renderTodoList();
    }
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt('Edit task:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            saveToLocalStorage();  // Save after change
            renderTodoList();
        }
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();  // Save after change
    renderTodoList();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveToLocalStorage();  // Save after change
    renderTodoList();
}

// ============================================
// FILTER FUNCTIONS
// ============================================
function setFilter(filter) {
    currentFilter = filter;
    
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTodoList();
}

// ============================================
// EVENT LISTENERS
// ============================================
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});
clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAllData);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        setFilter(filter);
    });
});

// ============================================
// INITIALIZATION
// ============================================
loadFromLocalStorage();