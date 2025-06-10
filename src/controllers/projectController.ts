import { v4 as uuid } from 'uuid';
import type { Request, Response } from 'express';
import { projects, addLog } from '../store';
import type { AuthRequest } from '../middleware/auth';
import type { Project } from '../types/project';

export const listProjects = (req: AuthRequest, res: Response): void => {
  const userId = req.user?.id;
  const visible = projects.filter((p) =>
    p.members.some((m) => m.userId === userId),
  );
  res.json(visible);
};

export const createProject = (req: AuthRequest, res: Response): void => {
  const { name } = req.body as { name: string };
  const project: Project = {
    id: uuid(),
    name,
    members: [{ userId: req.user!.id, role: 'Admin' }],
  };
  projects.push(project);
  addLog(project.id, `Project ${name} created`);
  res.json(project);
};

export const updateProject = (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const { name } = req.body as { name: string };
  const project = projects.find((p) => p.id === id);
  if (!project) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  project.name = name;
  addLog(id, `Project updated`);
  res.json(project);
};

export const deleteProject = (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  projects.splice(index, 1);
  addLog(id, `Project deleted`);
  res.status(204).send();
};

export const inviteMember = (req: AuthRequest, res: Response): void => {
  const { id } = req.params;
  const { userId, role } = req.body as { userId: string; role: 'Admin' | 'Member' };
  const project = projects.find((p) => p.id === id);
  if (!project) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  project.members.push({ userId, role });
  addLog(id, `User ${userId} invited`);
  res.json(project);
};
