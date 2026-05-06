const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = completed !== undefined ? { completed: completed === 'true' } : {};
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.json({ success: true, data: todo });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create todo
router.post('/', async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }
    const todo = await Todo.create({ title, completed });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update todo
router.put('/:id', async (req, res) => {
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
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.json({ success: true, message: 'Todo deleted successfully', data: todo });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE all todos
router.delete('/', async (req, res) => {
  try {
    const result = await Todo.deleteMany({});
    res.json({ success: true, message: `${result.deletedCount} todos deleted` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;