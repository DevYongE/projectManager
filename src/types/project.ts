import type { Role } from './user';

export interface ProjectMember {
  userId: string;
  role: Role;
}

export interface Project {
  id: string;
  name: string;
  members: ProjectMember[];
}
