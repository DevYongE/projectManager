import { v4 as uuid } from 'uuid';
import type { ActivityLog } from './types/log';
import type { Project } from './types/project';
import type { Task } from './types/task';
import type { User } from './types/user';

export const users: User[] = [];
export const projects: Project[] = [];
export const tasks: Task[] = [];
export const logs: ActivityLog[] = [];

export const addLog = (projectId: string, message: string): void => {
  logs.push({ id: uuid(), projectId, message, timestamp: Date.now() });
};
