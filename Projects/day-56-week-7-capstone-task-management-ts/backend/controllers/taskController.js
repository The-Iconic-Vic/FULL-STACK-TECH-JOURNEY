const { validateTask, sanitizeTaskData } = require('../utils/validators');

const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const { status, priority, dueDate, sort, order, search } = req.query;
    let query = { user: req.user.id };
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by priority
    if (priority) {
      query.priority = priority;
    }
    
    // Filter by due date
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate === 'today') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        query.dueDate = { $gte: today, $lt: tomorrow };
      } else if (dueDate === 'week') {
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        query.dueDate = { $gte: today, $lt: nextWeek };
      } else if (dueDate === 'overdue') {
        query.dueDate = { $lt: today };
      }
    }
    
    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    // Build sort object
    let sortObj = { createdAt: -1 };
    if (sort) {
      const sortOrder = order === 'asc' ? 1 : -1;
      sortObj = { [sort]: sortOrder };
    }
    
    const tasks = await Task.find(query).sort(sortObj);
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to access this task' });
    }
    
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    // Validate input
    const validation = validateTask(req.body)
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.errors.join(', ')
      })
    }
    
    // Sanitize input
    const sanitizedData = sanitizeTaskData(req.body)
    const { title, description, status, priority, dueDate } = sanitizedData
    
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id
    })
    
    res.status(201).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id)
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' })
    }
    
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this task' })
    }
    
    // Validate input (pass isUpdate=true to make title optional)
    const validation = validateTask(req.body, true)
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.errors.join(', ')
      })
    }
    
    // Sanitize input
    const sanitizedData = sanitizeTaskData(req.body)
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      sanitizedData,
      { new: true, runValidators: true }
    )
    
    res.json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this task' });
    }
    
    await task.deleteOne();
    
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Valid status is required' });
    }
    
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus
};