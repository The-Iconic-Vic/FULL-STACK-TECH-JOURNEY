# 📅 Day 46: Environment Variables & Configuration

**Date:** May 7, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 3 - Backend Development  
**Topics:** dotenv, Environment Variables, Project Structure, Best Practices

---

## 📋 Learning Objectives

- ✅ Install and configure dotenv package
- ✅ Create and use .env files
- ✅ Access environment variables with `process.env`
- ✅ Never commit .env to Git (add to .gitignore)
- ✅ Organize code with proper project structure
- ✅ Separate concerns: routes, controllers, models
- ✅ Add error handling middleware

---

## 🔐 Part 1: dotenv Package

### What is dotenv?

dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.

```bash
npm install dotenv
```

### Creating .env File

```env
# .env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=mySuperSecretKey
API_KEY=abc123xyz
NODE_ENV=development
```

### Loading Environment Variables

```javascript
// server.js
require('dotenv').config();

// Now you can access variables
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI;
const nodeEnv = process.env.NODE_ENV;

console.log(`Server running on port ${port}`);
console.log(`Environment: ${nodeEnv}`);
```

### Accessing with process.env

```javascript
// Basic access
const PORT = process.env.PORT || 3000;

// With fallback values
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
const API_KEY = process.env.API_KEY;

// Check if exists
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined');
  process.exit(1);
}
```

---

## 🔒 Part 2: Best Practices

### Never Commit .env to Git

**.gitignore:**
```gitignore
node_modules/
.env
.env.local
.env.*.local
.DS_Store
*.log
```

### Separate Config File

```javascript
// config/index.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development'
};
```

### Environment-Specific Files

```
.env.development   # Development environment
.env.production    # Production environment
.env.test          # Testing environment
```

```javascript
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });
```

### Default Values

```javascript
const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
  nodeEnv: process.env.NODE_ENV || 'development'
};
```

### Validation

```javascript
// config/validate.js
const requiredEnv = ['MONGODB_URI', 'JWT_SECRET'];

function validateEnv() {
  for (const envVar of requiredEnv) {
    if (!process.env[envVar]) {
      console.error(`Error: ${envVar} is not defined in .env file`);
      process.exit(1);
    }
  }
}

module.exports = validateEnv;
```

---

## 📁 Part 3: Project Structure

### Organized Structure

```
my-backend/
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Dependencies
├── server.js             # Entry point
├── config/
│   ├── database.js       # Database connection
│   └── index.js          # Config exports
├── models/
│   └── Todo.js           # Mongoose model
├── routes/
│   └── todoRoutes.js     # API routes
├── controllers/
│   └── todoController.js # Business logic
├── middleware/
│   ├── auth.js           # Authentication
│   └── errorHandler.js   # Error handling
└── utils/
    └── helpers.js        # Utility functions
```

### server.js (Entry Point)

```javascript
// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### config/database.js

```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### models/Todo.js

```javascript
// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);
```

### controllers/todoController.js

```javascript
// controllers/todoController.js
const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Public
const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Create todo
// @route   POST /api/todos
// @access  Public
const createTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }
    const todo = await Todo.create({ title, completed });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.json({ success: true, message: 'Todo deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
};
```

### routes/todoRoutes.js

```javascript
// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

router.route('/')
  .get(getTodos)
  .post(createTodo)
  .delete(deleteTodo);  // Delete all (optional)

router.route('/:id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;
```

### middleware/errorHandler.js

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
```

---

## 📝 Quick Reference

### dotenv Setup
```bash
npm install dotenv
```

```javascript
require('dotenv').config();
const port = process.env.PORT;
```

### .env File
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/db
NODE_ENV=development
```

### .gitignore
```gitignore
node_modules/
.env
.env.*
.DS_Store
```

### Project Structure Summary

| Folder | Purpose |
|--------|---------|
| `config/` | Database connection, config exports |
| `models/` | Mongoose schemas |
| `routes/` | API route definitions |
| `controllers/` | Business logic |
| `middleware/` | Custom middleware |
| `utils/` | Helper functions |

---

## ✅ Day 46 Checklist

- [ ] Install dotenv package
- [ ] Create .env file with environment variables
- [ ] Add .env to .gitignore
- [ ] Load environment variables with dotenv
- [ ] Use process.env to access variables
- [ ] Organize code with proper folder structure
- [ ] Separate routes, controllers, models
- [ ] Create database connection file
- [ ] Add error handling middleware
- [ ] Refactor Todo API with new structure
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Never commit .env to Git** – add it to .gitignore
2. **Use dotenv** to load environment variables
3. **Always provide default values** for fallback
4. **Validate required variables** at startup
5. **Separate concerns** – routes, controllers, models
6. **Use environment-specific files** for different environments
7. **Error handling middleware** should be last
8. **Keep configuration separate** from business logic

