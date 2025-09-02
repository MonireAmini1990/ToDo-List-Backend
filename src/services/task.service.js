import db from '../core/dataBase/connection.js';
import { tasks } from '../core/dataBase/schema.js';
import { eq, ilike, and } from 'drizzle-orm';

// GET all tasks for a user
export const getTasks = async (user_id) => {
  return await db.select().from(tasks).where(eq(tasks.user_id, user_id));
};

// GET single task by ID for a user
export const getTaskById = async (task_id, user_id) => {
  const task = await db.select()
    .from(tasks)
    .where(and(eq(tasks.task_id, task_id), eq(tasks.user_id, user_id)));
  return task[0] || null;
};

// CREATE new task
export const addTask = async (user_id, data) => {
  const {
    title,
    due_date = null,
    repeat = 'none',
    reminder = false,
    description = '',
    time = '09:00',
    status = 'pending',
    category = 'work',
    subtasks = []
  } = data;

  const result = await db.insert(tasks).values({
    title,
    user_id,
    due_date,
    repeat,
    reminder,
    description,
    time,
    status,
    category,
    subtasks
  }).returning();

  return result[0];
};

// UPDATE existing task
export const editTask = async (task_id, user_id, data) => {
  const task = await getTaskById(task_id, user_id);
  if (!task) throw new Error('Task not found');

  const result = await db.update(tasks)
    .set(data)
    .where(and(eq(tasks.task_id, task_id), eq(tasks.user_id, user_id)))
    .returning();

  return result[0];
};

// DELETE task (with user check)
export const deleteTask = async (task_id, user_id) => {
  const task = await getTaskById(task_id, user_id);
  if (!task) return 0;

  await db.delete(tasks).where(and(eq(tasks.task_id, task_id), eq(tasks.user_id, user_id)));
  return 1;
};

// UPDATE status
export const updateStatus = async (task_id, user_id, status) => {
  return await editTask(task_id, user_id, { status });
};

// MARK task as completed
export const markComplete = async (task_id, user_id) => {
  return await editTask(task_id, user_id, { status: 'completed' });
};

// UPDATE due date
export const updateDueDate = async (task_id, user_id, dueDate) => {
  return await editTask(task_id, user_id, { due_date: dueDate });
};

// SET repeat
export const setRepeat = async (task_id, user_id, repeat) => {
  return await editTask(task_id, user_id, { repeat });
};

// SET reminder
export const setReminder = async (task_id, user_id, reminder) => {
  return await editTask(task_id, user_id, { reminder });
};

// ADD a subtask
export const addSubtasks = async (task_id, user_id, newSubtask) => {
  const task = await getTaskById(task_id, user_id);
  if (!task) throw new Error('Task not found');

  const updatedSubtasks = task.subtasks || [];
  updatedSubtasks.push(newSubtask);

  return await editTask(task_id, user_id, { subtasks: updatedSubtasks });
};

// GET subtasks
export const getSubtasks = async (task_id, user_id) => {
  const task = await getTaskById(task_id, user_id);
  if (!task) throw new Error('Task not found');
  return task.subtasks || [];
};

// SEARCH tasks
export const searchTasks = async (user_id, query) => {
  const tasksList = await db.select().from(tasks)
    .where(and(eq(tasks.user_id, user_id), ilike(tasks.title, `%${query}%`)));
  return tasksList;
};
