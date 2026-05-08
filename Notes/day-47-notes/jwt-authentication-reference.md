# 📘 JWT Authentication Reference

## What is JWT?

JWT (JSON Web Token) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object.

### JWT Structure

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTY0MDAwMDAwMCwiZXhwIjoxNjQyNjAwMDAwfQ.signature

├───────────Header────────────┼────────────Payload────────────┼──Signature──┤
```

### Three Parts

| Part | Description | Example |
|------|-------------|---------|
| **Header** | Algorithm and token type | `{"alg": "HS256", "typ": "JWT"}` |
| **Payload** | Claims (user data, metadata) | `{"id": "123", "email": "user@example.com", "iat": 1640000000}` |
| **Signature** | Verifies the token hasn't been tampered | `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)` |

---

## Installation

```bash
npm install jsonwebtoken bcryptjs
```

---

## JWT Methods

### jwt.sign() - Generate Token

```javascript
const jwt = require('jsonwebtoken');

// Basic
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

// With expiration
const token = jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);

// With more options
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  {
    expiresIn: '7d',
    issuer: 'myapp',
    audience: 'myapp-users'
  }
);
```

### jwt.verify() - Verify Token

```javascript
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded); // { id: '123', iat: 1640000000, exp: 1642600000 }
} catch (error) {
  console.error('Invalid token:', error.message);
}
```

---

## bcrypt Methods

### bcrypt.hash() - Hash Password

```javascript
const bcrypt = require('bcryptjs');

// Hash password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
// $2b$10$N9qo8uLOickgx2ZMRZoMy.Mr7nKjJZV9yexD.MrIe3eP3ZRnqJ8hK
```

### bcrypt.compare() - Compare Password

```javascript
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
// returns true or false
```

### In Mongoose Schema (Pre-save Hook)

```javascript
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

---

## User Model

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
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

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

module.exports = mongoose.model('User', userSchema);
```

---

## Todo Model with User Reference

```javascript
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
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
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

## Authentication Middleware

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
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
        error: 'User not found'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, token failed'
    });
  }
};

// Role-based authorization
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

## Auth Controller

```javascript
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Create user
    const user = await User.create({ name, email, password });
    
    // Generate token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email }
  });
};

module.exports = { register, login, getMe };
```

---

## Todo Controller (Protected)

```javascript
const Todo = require('../models/Todo');

// @desc    Get all todos for current user
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id }).sort('-createdAt');
  res.json({ success: true, count: todos.length, data: todos });
};

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
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
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
  let todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }
  
  // Check ownership
  if (todo.user.toString() !== req.user.id) {
    return res.status(403).json({ success: false, error: 'Not authorized' });
  }
  
  const { title, completed } = req.body;
  todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, completed },
    { new: true, runValidators: true }
  );
  
  res.json({ success: true, data: todo });
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }
  
  if (todo.user.toString() !== req.user.id) {
    return res.status(403).json({ success: false, error: 'Not authorized' });
  }
  
  await todo.deleteOne();
  res.json({ success: true, message: 'Todo deleted' });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
```

---

## Routes

### authRoutes.js
```javascript
const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
```

### todoRoutes.js
```javascript
const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;
```

---

## Environment Variables (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/auth_todo_db

# JWT
JWT_SECRET=your_super_secret_key_here_minimum_32_characters
JWT_EXPIRE=30d
```

---

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'

# Get current user (replace TOKEN)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn JWT"}'

# Get todos
curl -X GET http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Common JWT Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `jwt malformed` | Token format is invalid | Check token structure |
| `jwt expired` | Token has expired | Refresh token or login again |
| `invalid signature` | Token was tampered | Regenerate token |
| `jwt must be provided` | No token in request | Add Authorization header |

---

## Security Best Practices

| Practice | Why |
|----------|-----|
| Store JWT secret in .env | Never hardcode secrets |
| Use strong secrets (32+ chars) | Prevents brute force |
| Set short expiration (7-30 days) | Limits damage if leaked |
| Use HTTPS in production | Prevents token interception |
| Hash passwords with bcrypt | One-way encryption |
| Never store plain text passwords | Data breach protection |
| Use `select: false` for password | Prevents accidental exposure |
| Validate email format | Prevents invalid data |
