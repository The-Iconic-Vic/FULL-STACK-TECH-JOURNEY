# 📘 MongoDB & Mongoose Reference

## SQL vs NoSQL

| SQL (Relational) | NoSQL (MongoDB) |
|------------------|-----------------|
| Tables | Collections |
| Rows | Documents |
| Columns | Fields |
| Fixed schema | Dynamic schema |
| Uses SQL | Uses JavaScript |
| Vertical scaling | Horizontal scaling |

---

## MongoDB Terminology

```
Database
  └── Collection (like Table)
       └── Document (like Row)
            └── Field (like Column)

Example:
todo_app
  └── todos
       └── { _id: 1, title: "Learn MongoDB", completed: false }
```

---

## Setup MongoDB Atlas

### Steps
1. Sign up at https://mongodb.com/cloud/atlas
2. Create FREE cluster (M0)
3. Create database user (username/password)
4. Add IP address (0.0.0.0/0 for anywhere)
5. Get connection string

### Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

---

## Mongoose Installation

```bash
npm install mongoose
npm install dotenv
```

---

## Connecting to MongoDB

```javascript
const mongoose = require('mongoose');

// Basic connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// With options
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Async function
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
```

---

## Schema Definition

### Basic Schema
```javascript
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
```

### Schema Types

| Type | JavaScript Type |
|------|-----------------|
| `String` | string |
| `Number` | number |
| `Boolean` | boolean |
| `Date` | date |
| `ObjectId` | ObjectId |
| `Array` | array |
| `Mixed` | any |

### Schema Options

```javascript
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [2, 'Too short'],
    maxlength: [50, 'Too long']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  age: {
    type: Number,
    min: 0,
    max: 150
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true  // Adds createdAt & updatedAt
});
```

### Validation Options

| Option | Description |
|--------|-------------|
| `required` | Field must be provided |
| `unique` | Value must be unique |
| `min` / `max` | Number range |
| `minlength` / `maxlength` | String length |
| `match` | Regex pattern |
| `enum` | Allowed values |
| `default` | Default value |
| `trim` | Remove whitespace |
| `lowercase` / `uppercase` | Transform case |

---

## Model

```javascript
const Todo = mongoose.model('Todo', todoSchema);
// Model name 'Todo' → collection 'todos' (plural, lowercase)
```

---

## CRUD Operations

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
// Get all
const todos = await Todo.find();

// With filter
const active = await Todo.find({ completed: false });

// By ID
const todo = await Todo.findById(id);

// First match
const todo = await Todo.findOne({ title: 'Learn MongoDB' });

// With sorting
const todos = await Todo.find().sort({ createdAt: -1 });

// Pagination
const page = 2;
const limit = 10;
const todos = await Todo.find()
  .skip((page - 1) * limit)
  .limit(limit);

// Count
const count = await Todo.countDocuments({ completed: false });
```

### Update (PUT)

```javascript
// Find by ID and update (returns original)
const todo = await Todo.findByIdAndUpdate(id, { completed: true });

// Returns updated document
const todo = await Todo.findByIdAndUpdate(
  id,
  { title: 'New Title' },
  { new: true, runValidators: true }
);

// Find one and update
const todo = await Todo.findOneAndUpdate(
  { title: 'Old' },
  { title: 'New' },
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
// By ID
const todo = await Todo.findByIdAndDelete(id);

// By filter
const todo = await Todo.findOneAndDelete({ title: 'Task' });

// Multiple
const result = await Todo.deleteMany({ completed: true });

// All
const result = await Todo.deleteMany({});
```

---

## Error Handling

```javascript
app.get('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    // Invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    res.status(500).json({ error: error.message });
  }
});
```

---

## Environment Variables (.env)

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

```javascript
require('dotenv').config();
const dbURI = process.env.MONGODB_URI;
```

**.gitignore:**
```
node_modules/
.env
.DS_Store
```

---

## Complete Todo Model

```javascript
// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title too long']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Transform response (remove __v)
todoSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Todo', todoSchema);
```

---

## Connection with Express

```javascript
// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/todos', require('./routes/todoRoutes'));

app.listen(3000, () => console.log('Server running'));
```

---

## Mongoose Query Methods

| Method | Description |
|--------|-------------|
| `find()` | Get all matching documents |
| `findOne()` | Get first matching document |
| `findById()` | Get document by ID |
| `create()` | Create new document |
| `save()` | Save document |
| `findByIdAndUpdate()` | Update by ID |
| `findOneAndUpdate()` | Update first match |
| `updateMany()` | Update multiple |
| `findByIdAndDelete()` | Delete by ID |
| `findOneAndDelete()` | Delete first match |
| `deleteMany()` | Delete multiple |
| `countDocuments()` | Count documents |
| `sort()` | Sort results |
| `limit()` | Limit results |
| `skip()` | Skip results |

---

## Schema Methods

```javascript
// Instance method
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// Query helper
userSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i') });
};

// Pre-save middleware (hash password)
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
```

---

## Quick Reference

### Connection
```javascript
mongoose.connect(uri)
mongoose.connection.on('connected', () => {})
```

### Schema
```javascript
new mongoose.Schema({ field: { type: String, required: true } })
mongoose.model('Name', schema)
```

### CRUD
```javascript
Model.create(data)
Model.find(filter)
Model.findById(id)
Model.findByIdAndUpdate(id, data, { new: true })
Model.findByIdAndDelete(id)
