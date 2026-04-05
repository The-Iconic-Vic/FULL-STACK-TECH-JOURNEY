// ============================================
// TO-DO LIST APPLICATION
// ============================================

// DOM Elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const totalCountSpan = document.getElementById('total-count');
const completedCountSpan = document.getElementById('completed-count');

// Task array to store tasks
let tasks = [];

// ============================================
// FUNCTIONS
// ============================================

// Function to update task counts
function updateCounts() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    
    totalCountSpan.textContent = total;
    completedCountSpan.textContent = completed;
}

// Function to render tasks to the DOM
function renderTasks() {
    // Clear the list
    taskList.innerHTML = '';
    
    // Check if there are no tasks
    if (tasks.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty-message';
        emptyLi.textContent = 'No tasks yet. Add one above!';
        taskList.appendChild(emptyLi);
        return;
    }
    
    // Loop through tasks and create list items
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-index', index);
        
        // Checkmark circle
        const checkDiv = document.createElement('div');
        checkDiv.className = 'task-check';
        
        // Task text
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '✗';
        deleteBtn.setAttribute('data-index', index);
        
        li.appendChild(checkDiv);
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    });
    
    updateCounts();
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Validate input
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create new task object
    const newTask = {
        text: taskText,
        completed: false
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Clear input
    taskInput.value = '';
    
    // Re-render the list
    renderTasks();
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// ============================================
// EVENT HANDLERS
// ============================================

// Add button click event
addButton.addEventListener('click', addTask);

// Enter key press in input field
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Event delegation for task list (handles both toggle and delete)
taskList.addEventListener('click', (event) => {
    const target = event.target;
    const li = target.closest('.task-item');
    
    if (!li) return;
    
    const index = li.getAttribute('data-index');
    
    // Check if delete button was clicked
    if (target.classList.contains('delete-btn')) {
        event.stopPropagation();
        deleteTask(index);
    } 
    // Otherwise toggle completion
    else {
        toggleTask(index);
    }
});

// ============================================
// INITIALIZATION
// ============================================

// Load any initial tasks (if needed)
// For now, we start with empty list
renderTasks();