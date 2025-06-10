import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

interface OverviewItem {
  project: string;
  totalTasks: number;
  done: number;
}

function DashboardPage(): JSX.Element {
  const { token } = useAuth();
  const [overview, setOverview] = useState<OverviewItem[]>([]);

  useEffect(() => {
    if (!token) return;
    api<OverviewItem[]>('/api/dashboard', { method: 'GET' }, token).then(
      setOverview,
    );
  }, [token]);

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Dashboard</h1>
      <ul className="space-y-2">
        {overview.map((o) => (
          <li key={o.project} className="border p-2">
            <span className="font-semibold">{o.project}</span> - {o.done}/
            {o.totalTasks} done
          </li>
        ))}
      </ul>
      <Link to="/projects">
        <Button className="mt-4">View Projects</Button>
      </Link>
    </Layout>
  );
}

export default DashboardPage;
