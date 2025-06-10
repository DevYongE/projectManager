export interface User {
  id: string;
  username: string;
  role: 'Admin' | 'Member';
}

export interface Project {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate?: string;
  priority?: number;
}
