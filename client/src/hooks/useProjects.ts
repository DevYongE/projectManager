import { useData } from '../context/DataContext';
import type { Project } from '../types';

export function useProjects(): Project[] {
  const { projects } = useData();
  return projects;
}
