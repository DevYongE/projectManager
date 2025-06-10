import { FormEvent, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Project, Task } from '../types';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import Layout from '../components/Layout';

function ProjectPage(): JSX.Element {
  const { id } = useParams();
  const { token } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!id || !token) return;
    api<Project>(`/api/projects/${id}`, { method: 'GET' }, token).then(
      setProject,
    );
    api<Task[]>(`/api/projects/${id}/tasks`, { method: 'GET' }, token).then(
      setTasks,
    );
  }, [id, token]);

  async function handleCreate(e: FormEvent): Promise<void> {
    e.preventDefault();
    if (!id || !token) return;
    const newTask = await api<Task>(
      `/api/projects/${id}/tasks`,
      {
        method: 'POST',
        body: JSON.stringify({ title }),
      },
      token,
    );
    setTasks((prev) => [...prev, newTask]);
    setTitle('');
  }

  async function updateStatus(taskId: string, status: string): Promise<void> {
    if (!token) return;
    const updated = await api<Task>(
      `/api/tasks/${taskId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ status }),
      },
      token,
    );
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
  }

  if (!project) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">{project.name}</h1>
      <form onSubmit={handleCreate} className="mb-4 flex gap-2">
        <input
          className="flex-1 border p-2"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between border p-2"
          >
            <span>
              {t.title} - {t.status}
            </span>
            <div className="space-x-2">
              {t.status !== 'todo' && (
                <Button
                  type="button"
                  onClick={() => updateStatus(t.id, 'todo')}
                >
                  To Do
                </Button>
              )}
              {t.status !== 'in_progress' && (
                <Button
                  type="button"
                  onClick={() => updateStatus(t.id, 'in_progress')}
                >
                  In Progress
                </Button>
              )}
              {t.status !== 'done' && (
                <Button
                  type="button"
                  onClick={() => updateStatus(t.id, 'done')}
                >
                  Done
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Link to="/projects">
        <Button className="mt-4">Back</Button>
      </Link>
    </Layout>
  );
}

export default ProjectPage;
