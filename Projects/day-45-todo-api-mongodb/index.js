const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    name: 'Todo API',
    version: '1.0.0',
    endpoints: {
      'GET /api/todos': 'Get all todos',
      'GET /api/todos/:id': 'Get a single todo',
      'POST /api/todos': 'Create a new todo',
      'PUT /api/todos/:id': 'Update a todo',
      'DELETE /api/todos/:id': 'Delete a todo',
      'DELETE /api/todos': 'Delete all todos'
    }
  });
});

app.use('/api/todos', require('./routes/todoRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Cannot ${req.method} ${req.path}` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 API endpoints:`);
      console.log(`   GET    /api/todos`);
      console.log(`   GET    /api/todos/:id`);
      console.log(`   POST   /api/todos`);
      console.log(`   PUT    /api/todos/:id`);
      console.log(`   DELETE /api/todos/:id`);
      console.log(`   DELETE /api/todos`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

startServer();