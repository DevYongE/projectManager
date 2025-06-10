import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { Button } from '../components/ui/Button';
import Layout from '../components/Layout';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

function ProjectsPage(): JSX.Element {
  const projects = useProjects();
  const { token } = useAuth();
  const [name, setName] = useState('');

  async function handleCreate(e: FormEvent): Promise<void> {
    e.preventDefault();
    if (!token) return;
    await api(
      '/api/projects',
      {
        method: 'POST',
        body: JSON.stringify({ name }),
      },
      token,
    );
    setName('');
    window.location.reload();
  }

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Projects</h1>
      <form onSubmit={handleCreate} className="mb-4 flex gap-2">
        <input
          className="flex-1 border p-2"
          placeholder="New project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">Create</Button>
      </form>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between border p-2"
          >
            <Link to={`/projects/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">
        <Button className="mt-4">Back</Button>
      </Link>
    </Layout>
  );
}

export default ProjectsPage;
