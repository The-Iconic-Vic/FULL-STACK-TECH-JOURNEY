# 📅 Day 45: MongoDB & Mongoose

**Date:** May 6, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 3 - Backend Development  
**Topics:** MongoDB, Mongoose ODM, Schemas, Models, CRUD Operations

---

## 📋 Learning Objectives

- ✅ Understand NoSQL vs SQL databases
- ✅ Understand MongoDB documents and collections
- ✅ Set up MongoDB Atlas (free cloud database)
- ✅ Connect Node.js to MongoDB using Mongoose
- ✅ Define a Schema for data structure
- ✅ Create a Model from Schema
- ✅ Perform CRUD operations with Mongoose

---

## 🗄️ Part 1: MongoDB Basics

### SQL vs NoSQL

| SQL (Relational) | NoSQL (MongoDB) |
|------------------|-----------------|
| Tables | Collections |
| Rows | Documents |
| Columns | Fields |
| Fixed schema | Dynamic schema |
| Uses SQL language | Uses JavaScript |
| Vertical scaling | Horizontal scaling |
| Examples: MySQL, PostgreSQL | Examples: MongoDB, Firebase |

### MongoDB Terminology

```
Database
  └── Collection (like Table)
       └── Document (like Row)
            └── Field (like Column)

Example:
Database: `todo_app`
  └── Collection: `todos`
       └── Document: `{ _id: 1, title: "Learn MongoDB", completed: false }`
```

---

### Setting Up MongoDB Atlas

**Step 1: Create Account**
- Go to https://mongodb.com/cloud/atlas
- Sign up for free account

**Step 2: Create Cluster**
- Click "Create Cluster"
- Select FREE tier (M0)
- Choose cloud provider (AWS) and region
- Click "Create Cluster" (takes 1-3 minutes)

**Step 3: Create Database User**
- Go to "Database Access"
- Add new user (username/password)
- Grant "Read and write to any database"

**Step 4: Network Access**
- Go to "Network Access"
- Add IP address (0.0.0.0/0 for anywhere)

**Step 5: Get Connection String**
- Click "Connect"
- Choose "Connect your application"
- Copy connection string
- Replace `<password>` with your password

```
mongodb+srv://username:<password>@cluster.mongodb.net/databaseName?retryWrites=true&w=majority
```

---

### Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?options
```

| Part | Description |
|------|-------------|
| `mongodb+srv://` | Protocol (SVR record) |
| `USERNAME` | Database user |
| `PASSWORD` | Database password |
| `CLUSTER` | Cluster address |
| `DATABASE_NAME` | Database to use |
| `?retryWrites=true` | Auto-retry writes |
| `&w=majority` | Write concern |

---

## 🔌 Part 2: Mongoose ODM

### What is Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides:
- Schema definition
- Data validation
- Type casting
- Query building
- Middleware (hooks)

```bash
npm install mongoose
```

---

### Connecting to MongoDB

```javascript
const mongoose = require('mongoose');

// Standard connection
mongoose.connect('mongodb+srv://...')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// With options
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Using async/await
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
```

---

### Environment Variables (.env)

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo_db?retryWrites=true&w=majority
```

```javascript
require('dotenv').config();
const dbURI = process.env.MONGODB_URI;
```

**.gitignore:**
```
.env
node_modules/
```

---

## 📐 Part 3: Mongoose Schema & Model

### Schema

A Schema defines the structure of documents in a collection.

```javascript
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Schema methods
todoSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Todo', todoSchema);
```

### Schema Types

| Type | Description | Example |
|------|-------------|---------|
| `String` | Text | `name: String` |
| `Number` | Numbers | `age: Number` |
| `Boolean` | True/False | `isActive: Boolean` |
| `Date` | Date/time | `createdAt: Date` |
| `ObjectId` | Reference to another document | `userId: mongoose.Schema.Types.ObjectId` |
| `Array` | List of values | `tags: [String]` |
| `Mixed` | Any type | `metadata: mongoose.Schema.Types.Mixed` |

### Schema Options

```javascript
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,           // Required field
    unique: true,             // Must be unique
    trim: true,               // Remove whitespace
    lowercase: true,          // Convert to lowercase
    minlength: 2,             // Minimum length
    maxlength: 50             // Maximum length
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  age: {
    type: Number,
    min: 0,                   // Minimum value
    max: 150                  // Maximum value
  },
  isActive: {
    type: Boolean,
    default: true             // Default value
  }
}, {
  timestamps: true            // Adds createdAt and updatedAt
});
```

---

### Model

A Model is a class that interacts with a collection.

```javascript
const Todo = mongoose.model('Todo', todoSchema);

// Mongoose automatically pluralizes and lowercases:
// 'Todo' → 'todos' collection
```

---

## 🛠️ Part 4: CRUD Operations

### Create (POST)

```javascript
// Method 1: new + save()
const todo = new Todo({ title: 'Learn MongoDB' });
const saved = await todo.save();

// Method 2: create()
const todo = await Todo.create({ title: 'Learn MongoDB' });

// Method 3: insertMany()
const todos = await Todo.insertMany([
  { title: 'Task 1' },
  { title: 'Task 2' }
]);
```

### Read (GET)

```javascript
// Find all
const todos = await Todo.find();

// Find with filter
const activeTodos = await Todo.find({ completed: false });

// Find one by ID
const todo = await Todo.findById(id);

// Find one with filter
const todo = await Todo.findOne({ title: 'Learn MongoDB' });

// With pagination
const page = 2;
const limit = 10;
const todos = await Todo.find()
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({ createdAt: -1 });

// Count documents
const count = await Todo.countDocuments({ completed: false });
```

### Update (PUT)

```javascript
// Find by ID and update (returns original)
const todo = await Todo.findByIdAndUpdate(id, { completed: true });

// Find by ID and update (returns updated)
const todo = await Todo.findByIdAndUpdate(
  id,
  { title: 'New Title' },
  { new: true, runValidators: true }
);

// Find one and update
const todo = await Todo.findOneAndUpdate(
  { title: 'Old Title' },
  { title: 'New Title' },
  { new: true }
);

// Update multiple
const result = await Todo.updateMany(
  { completed: false },
  { completed: true }
);
```

### Delete (DELETE)

```javascript
// Find by ID and delete
const todo = await Todo.findByIdAndDelete(id);

// Find one and delete
const todo = await Todo.findOneAndDelete({ title: 'Task' });

// Delete multiple
const result = await Todo.deleteMany({ completed: true });

// Delete all
const result = await Todo.deleteMany({});
```

---

## 📁 Complete Todo API with MongoDB

**index.js:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Import model
const Todo = require('./models/Todo');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = completed !== undefined ? { completed: completed === 'true' } : {};
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single todo
app.get('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    res.status(500).json({ error: error.message });
  }
});

// POST create todo
app.post('/api/todos', async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const todo = await Todo.create({ title, completed });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running'));
```

---

## 📝 Quick Reference

### Mongoose Setup
```bash
npm install mongoose
npm install dotenv
```

```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
```

### Schema Definition
```javascript
const schema = new mongoose.Schema({
  name: { type: String, required: true }
});
const Model = mongoose.model('Model', schema);
```

### CRUD Methods
| Operation | Method |
|-----------|--------|
| Create | `Model.create(data)` |
| Read all | `Model.find(filter)` |
| Read one | `Model.findById(id)` |
| Update | `Model.findByIdAndUpdate(id, data, options)` |
| Delete | `Model.findByIdAndDelete(id)` |

---

## ✅ Day 45 Checklist

- [ ] Understand NoSQL vs SQL differences
- [ ] Understand MongoDB documents and collections
- [ ] Create MongoDB Atlas account and cluster
- [ ] Get connection string
- [ ] Install mongoose
- [ ] Connect Node.js to MongoDB
- [ ] Define a Schema
- [ ] Create a Model
- [ ] Perform Create operation (`Model.create()`)
- [ ] Perform Read operation (`Model.find()`, `Model.findById()`)
- [ ] Perform Update operation (`Model.findByIdAndUpdate()`)
- [ ] Perform Delete operation (`Model.findByIdAndDelete()`)
- [ ] Convert Todo API to use MongoDB
- [ ] Test all endpoints
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **MongoDB is NoSQL** - documents instead of tables
2. **Mongoose is an ODM** - provides schema and validation
3. **Schema defines structure** - types, validation, defaults
4. **Model interacts with collection** - CRUD operations
5. **Always use environment variables** - keep secrets safe
6. **`findByIdAndUpdate` with `{ new: true }`** returns updated document
7. **Handle ObjectId errors** - invalid ID format crashes
8. **Use try/catch for async operations** - database errors need handling

