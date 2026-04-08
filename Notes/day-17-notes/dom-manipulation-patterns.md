# 📘 DOM Manipulation Patterns

## Pattern 1: Creating and Adding Elements

### Basic Pattern
```javascript
function createElement(tag, attributes, children) {
    const element = document.createElement(tag);
    
    // Set attributes
    for (const [key, value] of Object.entries(attributes || {})) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            for (const [dataKey, dataValue] of Object.entries(value)) {
                element.dataset[dataKey] = dataValue;
            }
        } else if (key === 'style') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    }
    
    // Add children
    (children || []).forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    
    return element;
}

// Usage
const card = createElement('div', { className: 'card' }, [
    createElement('h3', {}, ['Card Title']),
    createElement('p', {}, ['Card description text']),
    createElement('button', { className: 'btn' }, ['Click Me'])
]);
document.body.appendChild(card);
Pattern 2: Todo Item Creation
javascript
function createTodoItem(todo) {
    // Create container
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    
    // Create text span
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;
    
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    
    // Add event listeners
    checkbox.addEventListener('change', () => toggleComplete(todo.id));
    editBtn.addEventListener('click', () => editTodo(todo.id));
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    // Assemble
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    return li;
}
Pattern 3: Rendering a List
Full Re-render Pattern
javascript
function renderTodoList() {
    // Clear container
    todoList.innerHTML = '';
    
    // Get filtered todos
    let filteredTodos = todos;
    if (filter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }
    
    // Show empty message if needed
    if (filteredTodos.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.className = 'empty-message';
        emptyMsg.textContent = 'No tasks to display';
        todoList.appendChild(emptyMsg);
        return;
    }
    
    // Render each todo
    filteredTodos.forEach(todo => {
        const todoElement = createTodoItem(todo);
        todoList.appendChild(todoElement);
    });
}
Incremental Update Pattern
javascript
function addTodoIncremental(newTodo) {
    // Add to array
    todos.push(newTodo);
    
    // Create and append element (instead of re-rendering all)
    const todoElement = createTodoItem(newTodo);
    todoList.appendChild(todoElement);
    
    // Update stats only
    updateStats();
}
Pattern 4: Removing Elements
Direct Removal
javascript
function deleteTodo(id) {
    // Find element by data-id
    const todoElement = document.querySelector(`.todo-item[data-id="${id}"]`);
    if (todoElement) {
        todoElement.remove();
    }
    
    // Remove from array
    todos = todos.filter(todo => todo.id !== id);
    
    // Update stats
    updateStats();
}
Clear All Children
javascript
function clearAllTodos() {
    // Method 1: innerHTML
    todoList.innerHTML = '';
    
    // Method 2: while loop
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
    
    // Clear array
    todos = [];
    updateStats();
}
Pattern 5: Toggle Classes
Simple Toggle
javascript
function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        
        // Update DOM element
        const todoElement = document.querySelector(`.todo-item[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.toggle('completed');
            const checkbox = todoElement.querySelector('.todo-checkbox');
            if (checkbox) checkbox.checked = todo.completed;
        }
    }
}
Dark Mode Toggle
javascript
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateButtonText(isDark);
}
Pattern 6: Filtering
Filter Buttons
javascript
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply filter
            const filter = btn.dataset.filter;
            applyFilter(filter);
        });
    });
}

function applyFilter(filter) {
    const todos = document.querySelectorAll('.todo-item');
    
    todos.forEach(todo => {
        const isCompleted = todo.classList.contains('completed');
        
        switch(filter) {
            case 'active':
                todo.style.display = isCompleted ? 'none' : 'flex';
                break;
            case 'completed':
                todo.style.display = isCompleted ? 'flex' : 'none';
                break;
            default:
                todo.style.display = 'flex';
        }
    });
}
Pattern 7: Form Validation Feedback
javascript
function setupFormValidation() {
    const form = document.getElementById('my-form');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
        
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
}

function validateInput(input) {
    const isValid = input.checkValidity();
    const formGroup = input.closest('.form-group');
    
    if (isValid) {
        formGroup.classList.add('valid');
        formGroup.classList.remove('invalid');
    } else {
        formGroup.classList.add('invalid');
        formGroup.classList.remove('valid');
    }
}
Pattern 8: Modal Creation
javascript
function createModal(title, content, onConfirm) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'modal-header';
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.className = 'modal-close';
    header.appendChild(titleEl);
    header.appendChild(closeBtn);
    
    // Create body
    const body = document.createElement('div');
    body.className = 'modal-body';
    body.innerHTML = content;
    
    // Create footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm';
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    footer.appendChild(confirmBtn);
    footer.appendChild(cancelBtn);
    
    // Assemble
    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(footer);
    overlay.appendChild(modal);
    
    // Event handlers
    function closeModal() {
        overlay.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    confirmBtn.addEventListener('click', () => {
        onConfirm();
        closeModal();
    });
    
    document.body.appendChild(overlay);
    return modal;
}
Pattern 9: Infinite Scroll (Load More)
javascript
let page = 1;
let isLoading = false;

function loadMoreItems() {
    if (isLoading) return;
    isLoading = true;
    
    fetchItems(page).then(items => {
        items.forEach(item => {
            const element = createItemElement(item);
            container.appendChild(element);
        });
        page++;
        isLoading = false;
    });
}

// Intersection Observer for infinite scroll
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMoreItems();
    }
}, { threshold: 0.1 });

observer.observe(sentinel);
Pattern 10: Search/Filter with Debounce
javascript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function setupSearch() {
    const searchInput = document.getElementById('search');
    
    const handleSearch = debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.item');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    }, 300);
    
    searchInput.addEventListener('input', handleSearch);
}
Pattern 11: Tab Component
javascript
function createTabs(tabsData) {
    const container = document.createElement('div');
    container.className = 'tabs-container';
    
    // Create tab headers
    const headers = document.createElement('div');
    headers.className = 'tab-headers';
    
    // Create tab panels
    const panels = document.createElement('div');
    panels.className = 'tab-panels';
    
    tabsData.forEach((tab, index) => {
        // Create header button
        const button = document.createElement('button');
        button.className = 'tab-btn';
        button.textContent = tab.title;
        
        // Create panel
        const panel = document.createElement('div');
        panel.className = 'tab-panel';
        panel.innerHTML = tab.content;
        if (index !== 0) panel.style.display = 'none';
        
        button.addEventListener('click', () => {
            // Hide all panels
            panels.querySelectorAll('.tab-panel').forEach(p => {
                p.style.display = 'none';
            });
            // Show current panel
            panel.style.display = 'block';
            
            // Update active button
            headers.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
        
        if (index === 0) button.classList.add('active');
        
        headers.appendChild(button);
        panels.appendChild(panel);
    });
    
    container.appendChild(headers);
    container.appendChild(panels);
    return container;
}