import type { Response } from 'express';
import { tasks } from '../store';
import type { AuthRequest } from '../middleware/auth';

export const getCalendar = (req: AuthRequest, res: Response): void => {
  const { projectId } = req.params;
  const events = tasks
    .filter((t) => t.projectId === projectId && t.dueDate)
    .map((t) => ({ title: t.title, date: t.dueDate }));
  res.json(events);
};
