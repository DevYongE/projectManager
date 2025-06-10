import { useEffect, useState } from 'react';
import type { Project } from '../types';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export function useProjects(): Project[] {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!token) return;
    api<Project[]>('/api/projects', { method: 'GET' }, token).then(setProjects);
  }, [token]);

  return projects;
}
