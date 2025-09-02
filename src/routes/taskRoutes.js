import express from 'express';
import {
  getTasks,
  getTaskById,
  addTask,
  editTask,
  deleteTask,
  updateDueDate,
  markComplete,
  updateStatus,
  searchTasks,
  setRepeat,
  addSubtasks,
  getSubtasks,
  setReminder
} from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.get('/search', searchTasks);

taskRouter.get('/', getTasks);
taskRouter.post('/', addTask);

taskRouter.get('/:task_id', getTaskById);
taskRouter.put('/:task_id', editTask);
taskRouter.delete('/:task_id', deleteTask);
taskRouter.put('/:task_id/due-date', updateDueDate);
taskRouter.put('/:task_id/complete', markComplete);
taskRouter.put('/:task_id/status', updateStatus);
taskRouter.put('/:task_id/repeat', setRepeat);
taskRouter.put('/:task_id/reminder', setReminder);

taskRouter.post('/:task_id/subtasks', addSubtasks);
taskRouter.get('/:task_id/subtasks', getSubtasks);

export default taskRouter;
