import * as taskService from '../services/task.service.js';

// GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.user_id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(parseInt(req.params.task_id), req.user.user_id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new task
export const addTask = async (req, res) => {
  try {
    const newTask = await taskService.addTask(req.user.user_id, req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE task
export const editTask = async (req, res) => {
  try {
    const updatedTask = await taskService.editTask(
      parseInt(req.params.task_id),
      req.user.user_id,
      req.body
    );
    res.json(updatedTask);
  } catch (err) {
    if (err.message === 'Task not found') return res.status(404).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

// DELETE task
export const deleteTask = async (req, res) => {
  try {
    const deletedCount = await taskService.deleteTask(
      parseInt(req.params.task_id),
      req.user.user_id
    );
    if (deletedCount === 0) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE status
export const updateStatus = async (req, res) => {
  try {
    const updatedTask = await taskService.updateStatus(
      parseInt(req.params.task_id),
      req.user.user_id,
      req.body.status
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MARK task complete
export const markComplete = async (req, res) => {
  try {
    const updatedTask = await taskService.markComplete(
      parseInt(req.params.task_id),
      req.user.user_id
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE due date
export const updateDueDate = async (req, res) => {
  try {
    const updatedTask = await taskService.updateDueDate(
      parseInt(req.params.task_id),
      req.user.user_id,
      req.body.dueDate
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SET recurring
export const setRepeat = async (req, res) => {
  try {
    const updatedTask = await taskService.setRepeat(
      parseInt(req.params.task_id),
      req.user.user_id,
      req.body.repeat
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SET reminder
export const setReminder = async (req, res) => {
  try {
    const updatedTask = await taskService.setReminder(
      parseInt(req.params.task_id),
      req.user.user_id,
      req.body.reminder
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD subtasks
export const addSubtasks = async (req, res) => {
  try {
    const updatedTask = await taskService.addSubtasks(
      parseInt(req.params.task_id),
      req.user.user_id,
      req.body // آرایه یا شیء subtasks
    );
    res.status(201).json(updatedTask);
  } catch (err) {
    if (err.message === 'Task not found') return res.status(404).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

// GET subtasks
export const getSubtasks = async (req, res) => {
  try {
    const subtasks = await taskService.getSubtasks(
      parseInt(req.params.task_id),
      req.user.user_id
    );
    res.json(subtasks);
  } catch (err) {
    if (err.message === 'Task not found') return res.status(404).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

// SEARCH tasks
export const searchTasks = async (req, res) => {
  try {
    const tasks = await taskService.searchTasks(req.user.user_id, req.query.q);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
