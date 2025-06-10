import type { Response } from 'express';
import { logs } from '../store';
import type { AuthRequest } from '../middleware/auth';

export const listLogs = (req: AuthRequest, res: Response): void => {
  const { projectId } = req.params;
  const projectLogs = logs.filter((l) => l.projectId === projectId);
  res.json(projectLogs);
};
