import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { Button } from '../components/ui/Button';
import Layout from '../components/Layout';

function DashboardPage(): JSX.Element {
  const projects = useProjects();

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Dashboard</h1>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border p-2">
            {p.name}
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
