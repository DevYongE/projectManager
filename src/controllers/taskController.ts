import { v4 as uuid } from 'uuid';
import type { Response } from 'express';
import { tasks, addLog } from '../store';
import type { AuthRequest } from '../middleware/auth';
import type { Task, TaskStatus } from '../types/task';

export const listTasks = (req: AuthRequest, res: Response): void => {
  const { projectId } = req.params;
  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  res.json(projectTasks);
};

export const createTask = (req: AuthRequest, res: Response): void => {
  const { projectId } = req.params;
  const { title, dueDate, priority } = req.body as {
    title: string;
    dueDate?: string;
    priority?: number;
  };
  const task: Task = {
    id: uuid(),
    projectId,
    title,
    status: 'todo',
    dueDate,
    priority,
  };
  tasks.push(task);
  addLog(projectId, `Task ${title} created`);
  res.json(task);
};

export const updateTask = (req: AuthRequest, res: Response): void => {
  const { taskId } = req.params;
  const { status } = req.body as { status: TaskStatus };
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  task.status = status;
  addLog(task.projectId, `Task ${task.title} updated to ${status}`);
  res.json(task);
};
