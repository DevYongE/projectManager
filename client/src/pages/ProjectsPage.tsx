import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';

function ProjectsPage(): JSX.Element {
  const projects = useProjects();

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Projects</h1>
      <div className="space-y-2">
        {projects.map((p) => (
          <Card key={p.id} className="flex items-center justify-between p-2">
            <Link to={`/projects/${p.id}`}>{p.name}</Link>
          </Card>
        ))}
      </div>
      <Link to="/">
        <Button className="mt-4">Back</Button>
      </Link>
    </Layout>
  );
}

export default ProjectsPage;
