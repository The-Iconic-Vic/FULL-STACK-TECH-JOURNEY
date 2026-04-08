// ============================================
// TODO LIST APP - DOM MANIPULATION MASTERY
// Demonstrating: createElement, textContent, appendChild, remove, cloneNode, traversal
// ============================================

// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const totalCountSpan = document.getElementById('total-count');
const activeCountSpan = document.getElementById('active-count');
const completedCountSpan = document.getElementById('completed-count');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Todo items array
let todos = [];

// Current filter
let currentFilter = 'all';

// ============================================
// CREATE TODO ELEMENT
// Demonstrating: createElement(), textContent, classList, addEventListener
// ============================================
function createTodoElement(todo) {
    // Create main li element
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', todo.id);
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleComplete(todo.id));
    
    // Create text span
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;
    
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => editTodo(todo.id));
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    // Append all to li
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    return li;
}

// ============================================
// RENDER TODO LIST
// Demonstrating: innerHTML = '' (clear), appendChild, forEach
// ============================================
function renderTodoList() {
    // Clear the list using innerHTML
    todoList.innerHTML = '';
    
    // Filter todos based on current filter
    let filteredTodos = [...todos];
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }
    
    // Check if no todos to display
    if (filteredTodos.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty-message';
        emptyLi.textContent = 'No tasks to display.';
        todoList.appendChild(emptyLi);
        updateStats();
        return;
    }
    
    // Create and append each todo element
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
// ADD TODO
// Demonstrating: push() to array
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
    todoInput.value = '';
    renderTodoList();
    todoInput.focus();
}

// ============================================
// TOGGLE COMPLETE
// ============================================
function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodoList();
    }
}

// ============================================
// EDIT TODO
// Demonstrating: prompt for editing
// ============================================
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt('Edit task:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            renderTodoList();
        }
    }
}

// ============================================
// DELETE TODO
// Demonstrating: filter() to remove from array
// ============================================
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodoList();
}

// ============================================
// CLEAR COMPLETED
// Demonstrating: filter() to keep only active
// ============================================
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    renderTodoList();
}

// ============================================
// SET FILTER
// Demonstrating: classList to update active button
// ============================================
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active button styling
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

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        setFilter(filter);
    });
});

// ============================================
// INITIALIZATION
// ============================================
renderTodoList();