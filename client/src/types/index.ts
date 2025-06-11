export interface User {
  id: string;
  username: string;
  role: 'Admin' | 'Member';
}

export interface Project {
  id: string;
  type: '신규' | '추가';
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  os: string;
  totalMemory: number;
  availableMemory: number;
  requestDetail: string;
}

export type NewProject = Omit<Project, 'id'>;

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate?: string;
  priority?: number;
}
