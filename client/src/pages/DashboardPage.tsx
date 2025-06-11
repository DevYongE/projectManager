import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';

function DashboardPage(): JSX.Element {
  const { projects, tasks, addProject } = useData();
  const [name, setName] = useState<string>('');

  function handleAdd(e: React.FormEvent): void {
    e.preventDefault();
    if (!name) return;
    addProject(name);
    setName('');
  }

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Dashboard</h1>
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="flex-1 rounded border p-2"
          placeholder="New project"
        />
        <Button type="submit">Add</Button>
      </form>
      <div className="space-y-2">
        {projects.map((p) => {
          const count = tasks.filter((t) => t.projectId === p.id).length;
          return (
            <Card key={p.id} className="p-2">
              {p.name} <span className="text-sm text-gray-500">({count})</span>
            </Card>
          );
        })}
      </div>
      <Link to="/projects">
        <Button className="mt-4">View Projects</Button>
      </Link>
    </Layout>
  );
}

export default DashboardPage;
