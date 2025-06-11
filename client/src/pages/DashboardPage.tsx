import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';

function DashboardPage(): JSX.Element {
  const projects = useProjects();

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Dashboard</h1>
      <div className="space-y-2">
        {projects.map((p) => (
          <Card key={p.id} className="p-2">
            {p.name}
          </Card>
        ))}
      </div>
      <Link to="/projects">
        <Button className="mt-4">View Projects</Button>
      </Link>
    </Layout>
  );
}

export default DashboardPage;
