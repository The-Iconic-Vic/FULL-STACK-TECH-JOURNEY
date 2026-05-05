// ============================================
// TODO API - Express REST API
// Demonstrates: GET, POST, PUT, DELETE endpoints
// ============================================

const express = require('express');
const app = express();
const PORT = 3000;

// ============================================
// MIDDLEWARE
// ============================================

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Built-in middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ============================================
// IN-MEMORY DATA STORAGE
// ============================================

let todos = [
    { id: 1, title: 'Learn Express.js', completed: false },
    { id: 2, title: 'Build a REST API', completed: false },
    { id: 3, title: 'Test with Postman', completed: true }
];

let nextId = 4;

// ============================================
// HELPER FUNCTIONS
// ============================================

function findTodoIndex(id) {
    return todos.findIndex(todo => todo.id === id);
}

// ============================================
// ROUTES
// ============================================

// Root route - API information
app.get('/', (req, res) => {
    res.json({
        name: 'Todo API',
        version: '1.0.0',
        endpoints: {
            'GET /api/todos': 'Get all todos',
            'GET /api/todos/:id': 'Get a single todo',
            'POST /api/todos': 'Create a new todo',
            'PUT /api/todos/:id': 'Update a todo',
            'DELETE /api/todos/:id': 'Delete a todo'
        }
    });
});

// ============================================
// GET /api/todos - Get all todos
// ============================================
app.get('/api/todos', (req, res) => {
    // Optional: Filter by completed status
    const { completed } = req.query;
    
    if (completed !== undefined) {
        const isCompleted = completed === 'true';
        const filtered = todos.filter(todo => todo.completed === isCompleted);
        return res.json({
            total: filtered.length,
            todos: filtered
        });
    }
    
    res.json({
        total: todos.length,
        todos: todos
    });
});

// ============================================
// GET /api/todos/:id - Get single todo
// ============================================
app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
    
    res.json(todo);
});

// ============================================
// POST /api/todos - Create new todo
// ============================================
app.post('/api/todos', (req, res) => {
    const { title, completed } = req.body;
    
    // Validation
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    const newTodo = {
        id: nextId++,
        title: title.trim(),
        completed: completed === true || completed === 'true' ? true : false
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// ============================================
// PUT /api/todos/:id - Update todo
// ============================================
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const index = findTodoIndex(id);
    
    if (index === -1) {
        return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
    
    // Update only provided fields
    if (title !== undefined) {
        todos[index].title = title.trim();
    }
    if (completed !== undefined) {
        todos[index].completed = completed === true || completed === 'true';
    }
    
    res.json(todos[index]);
});

// ============================================
// DELETE /api/todos/:id - Delete todo
// ============================================
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = findTodoIndex(id);
    
    if (index === -1) {
        return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
    
    const deletedTodo = todos[index];
    todos.splice(index, 1);
    
    res.json({ message: 'Todo deleted successfully', deleted: deletedTodo });
});

// ============================================
// DELETE /api/todos - Delete all todos (clear)
// ============================================
app.delete('/api/todos', (req, res) => {
    todos = [];
    nextId = 1;
    res.json({ message: 'All todos deleted', count: 0 });
});

// ============================================
// 404 Handler - Catch all unmatched routes
// ============================================
app.use((req, res) => {
    res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

// ============================================
// Error handling middleware
// ============================================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`\n🚀 Todo API Server running on http://localhost:${PORT}`);
    console.log(`📋 Available endpoints:\n`);
    console.log(`  GET    /api/todos           - Get all todos`);
    console.log(`  GET    /api/todos/:id       - Get a single todo`);
    console.log(`  POST   /api/todos           - Create a new todo`);
    console.log(`  PUT    /api/todos/:id       - Update a todo`);
    console.log(`  DELETE /api/todos/:id       - Delete a todo`);
    console.log(`  DELETE /api/todos           - Delete all todos\n`);
});