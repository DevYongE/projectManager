import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Project, Task } from '../types';
import { generateId } from '../utils/id';

interface DataContextValue {
  projects: Project[];
  tasks: Task[];
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, title: string) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem('pm-projects');
    return stored ? (JSON.parse(stored) as Project[]) : [];
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('pm-tasks');
    return stored ? (JSON.parse(stored) as Task[]) : [];
  });

  useEffect(() => {
    localStorage.setItem('pm-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pm-tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addProject(name: string): void {
    const project: Project = { id: generateId(), name };
    setProjects((prev) => [...prev, project]);
  }

  function deleteProject(id: string): void {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTasks((prev) => prev.filter((t) => t.projectId !== id));
  }

  function addTask(projectId: string, title: string): void {
    const task: Task = { id: generateId(), projectId, title, status: 'To Do' };
    setTasks((prev) => [...prev, task]);
  }

  function updateTaskStatus(taskId: string, status: Task['status']): void {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
    );
  }

  const value: DataContextValue = {
    projects,
    tasks,
    addProject,
    deleteProject,
    addTask,
    updateTaskStatus,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
