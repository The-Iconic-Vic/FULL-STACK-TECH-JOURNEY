import { Response, NextFunction } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/authMiddleware';
import { ITaskInput, ITaskUpdate, IStatusUpdate, ITaskQueryParams } from '../types';
import { validateTask, sanitizeTaskData } from '../utils/validators';

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { status, priority, dueDate, sort, order, search } = req.query as ITaskQueryParams;
    const query: any = { user: req.user!.id };
    
    if (status) {
      query.status = status;
    }
    
    if (priority) {
      query.priority = priority;
    }
    
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
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    let sortObj: any = { createdAt: -1 };
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

export const getTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user!.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to access this task' });
    }
    
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Validate input
    const validation = validateTask(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.errors.join(', ')
      });
    }
    
    // Sanitize input
    const sanitizedData = sanitizeTaskData(req.body);
    const { title, description, status, priority, dueDate } = sanitizedData;
    
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      user: req.user!.id
    });
    
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user!.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this task' });
    }
    
    // Validate input (isUpdate = true makes title optional)
    const validation = validateTask(req.body, true);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.errors.join(', ')
      });
    }
    
    // Sanitize input
    const sanitizedData = sanitizeTaskData(req.body);
    const updateData: any = {};
    if (sanitizedData.title !== undefined) updateData.title = sanitizedData.title;
    if (sanitizedData.description !== undefined) updateData.description = sanitizedData.description;
    if (sanitizedData.status !== undefined) updateData.status = sanitizedData.status;
    if (sanitizedData.priority !== undefined) updateData.priority = sanitizedData.priority;
    if (sanitizedData.dueDate !== undefined) updateData.dueDate = sanitizedData.dueDate ? new Date(sanitizedData.dueDate) : null;
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user!.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this task' });
    }
    
    await task.deleteOne();
    
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { status } = req.body as IStatusUpdate;
    
    if (!status || !['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Valid status is required' });
    }
    
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user!.id) {
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