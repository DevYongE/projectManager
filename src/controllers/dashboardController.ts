import type { Response } from 'express';
import { projects, tasks } from '../store';
import type { AuthRequest } from '../middleware/auth';

export const getDashboard = (req: AuthRequest, res: Response): void => {
  const userId = req.user!.id;
  const userProjects = projects.filter((p) =>
    p.members.some((m) => m.userId === userId),
  );
  const overview = userProjects.map((p) => {
    const projectTasks = tasks.filter((t) => t.projectId === p.id);
    return {
      project: p.name,
      totalTasks: projectTasks.length,
      done: projectTasks.filter((t) => t.status === 'done').length,
    };
  });
  res.json(overview);
};
