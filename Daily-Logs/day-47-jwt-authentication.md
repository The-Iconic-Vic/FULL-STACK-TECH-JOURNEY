# 📅 Day 47: Authentication with JWT

**Date:** May 8, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 3 - Backend Development  
**Topics:** JWT, Password Hashing, Authentication Middleware, Protected Routes

---

## 📋 Learning Objectives

- ✅ Understand what JWT (JSON Web Token) is and its structure
- ✅ Install and use jsonwebtoken and bcryptjs
- ✅ Generate tokens with `jwt.sign()`
- ✅ Verify tokens with `jwt.verify()`
- ✅ Hash passwords with `bcrypt.hash()`
- ✅ Compare passwords with `bcrypt.compare()`
- ✅ Create authentication middleware to protect routes
- ✅ Add user-specific data to todos

---

## 🔐 Part 1: JWT Basics

### What is JWT?

JWT (JSON Web Token) is an open standard for securely transmitting information between parties as a JSON object.

```
Structure: xxxxx.yyyyy.zzzzz
           Header.Payload.Signature
```

### JWT Structure

| Part | Description | Example |
|------|-------------|---------|
| **Header** | Algorithm & token type | `{"alg": "HS256", "typ": "JWT"}` |
| **Payload** | Claims (user data) | `{"id": "123", "email": "user@example.com"}` |
| **Signature** | Verifies the token | `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)` |

### Installing Packages

```bash
npm install jsonwebtoken bcryptjs
```

### Generating a Token (jwt.sign)

```javascript
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
  { id: user._id, email: user.email },  // Payload
  process.env.JWT_SECRET,                // Secret key
  { expiresIn: '30d' }                   // Options
);

// Example output
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTY0MDAwMDAwMCwiZXhwIjoxNjQyNjAwMDAwfQ.signature
```

### Verifying a Token (jwt.verify)

```javascript
// Verify token
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded); // { id: '123', email: 'user@example.com', iat: ..., exp: ... }
} catch (error) {
  console.error('Invalid token');
}
```

---

## 🔒 Part 2: Password Hashing with bcrypt

### Why Hash Passwords?

| Plain Text | Hashed |
|------------|--------|
| `password123` | `$2b$10$abcdefghijklmnopqrstuvwxyz...` |
| ❌ Readable if database is hacked | ✅ One-way encryption |
| ❌ Users reuse passwords across sites | ✅ Same password → different hash each time |

### Installing bcryptjs

```bash
npm install bcryptjs
```

### Hashing a Password (bcrypt.hash)

```javascript
const bcrypt = require('bcryptjs');

// Hash a password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash('myPlainTextPassword', saltRounds);
// $2b$10$N9qo8uLOickgx2ZMRZoMy.Mr7nKjJZV9yexD.MrIe3eP3ZRnqJ8hK
```

### Comparing a Password (bcrypt.compare)

```javascript
// Compare plain text with hashed password
const isMatch = await bcrypt.compare('myPlainTextPassword', hashedPassword);
// returns true or false
```

---

## 👤 Part 3: User Model

### User Schema

```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

module.exports = mongoose.model('User', userSchema);
```

### Updated Todo Model (with user association)

```javascript
// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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

---

## 🛡️ Part 4: Authentication Middleware

### authMiddleware.js

```javascript
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token (exclude password)
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized, user not found'
      });
    }
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      error: 'Not authorized, token failed'
    });
  }
};

// Optional: Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
```

---

## 📡 Part 5: Authentication Controllers

### authController.js

```javascript
// controllers/authController.js
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};
```

---

## 📝 Part 6: Updated Todo Controllers (with user filter)

### todoController.js (updated)

```javascript
// controllers/todoController.js
const Todo = require('../models/Todo');

// @desc    Get all todos for logged in user
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    
    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to access this todo' });
    }
    
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }
    
    const todo = await Todo.create({
      title,
      completed,
      user: req.user.id
    });
    
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    
    // Check ownership
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this todo' });
    }
    
    const { title, completed } = req.body;
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true, runValidators: true }
    );
    
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    
    // Check ownership
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this todo' });
    }
    
    await todo.deleteOne();
    
    res.json({ success: true, message: 'Todo deleted successfully' });
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

---

## 🚏 Part 7: Routes

### authRoutes.js

```javascript
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
```

### todoRoutes.js (updated)

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
const { protect } = require('../middleware/authMiddleware');

// All todo routes are protected
router.use(protect);

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;
```

---

## ⚙️ Part 8: Environment Variables

### .env file

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/todo_auth_db

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=30d
```

---

## 🧪 Testing with Postman

### Register User
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User (Protected)
```
GET http://localhost:3000/api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

### Create Todo (Protected)
```
POST http://localhost:3000/api/todos
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Learn JWT Authentication"
}
```

### Get All Todos (Protected - only user's todos)
```
GET http://localhost:3000/api/todos
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📝 Quick Reference

### JWT Methods
| Method | Purpose |
|--------|---------|
| `jwt.sign(payload, secret, options)` | Create token |
| `jwt.verify(token, secret)` | Verify token |

### bcrypt Methods
| Method | Purpose |
|--------|---------|
| `bcrypt.hash(password, saltRounds)` | Hash password |
| `bcrypt.compare(password, hashed)` | Compare password |

### Authentication Flow

```
1. User registers → Hash password → Save user → Return JWT
2. User logs in → Find user → Compare password → Return JWT
3. Protected route → Check JWT → Attach user to req → Allow access
```

---

## ✅ Day 47 Checklist

- [ ] Install jsonwebtoken and bcryptjs
- [ ] Understand JWT structure (Header, Payload, Signature)
- [ ] Generate tokens with jwt.sign()
- [ ] Verify tokens with jwt.verify()
- [ ] Hash passwords with bcrypt.hash()
- [ ] Compare passwords with bcrypt.compare()
- [ ] Create User model with password hashing middleware
- [ ] Create register and login endpoints
- [ ] Create protect middleware for routes
- [ ] Update Todo model to belong to a user
- [ ] Filter todos by authenticated user
- [ ] Test all endpoints with Postman
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Never store plain text passwords** – always hash with bcrypt
2. **JWT consists of three parts** – Header, Payload, Signature
3. **Use environment variables** for JWT secret and expiration
4. **Protect routes with middleware** – check token before allowing access
5. **Attach user to request object** – so controllers can access req.user
6. **Filter database queries by user** – users can only see their own data
7. **Always verify token expiration** – jwt.verify handles this automatically
8. **Use secure password requirements** – min length, complexity

