import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Project, Task } from '../types';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';

function ProjectPage(): JSX.Element {
  const { id } = useParams();
  const { token } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!id || !token) return;
    api<Project>(`/api/projects/${id}`, { method: 'GET' }, token).then(
      setProject,
    );
    api<Task[]>(`/api/projects/${id}/tasks`, { method: 'GET' }, token).then(
      setTasks,
    );
  }, [id, token]);

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
      <div className="space-y-2">
        {tasks.map((t) => (
          <Card key={t.id} className="p-2">
            {t.title} - {t.status}
          </Card>
        ))}
      </div>
      <Link to="/projects">
        <Button className="mt-4">Back</Button>
      </Link>
    </Layout>
  );
}

export default ProjectPage;
