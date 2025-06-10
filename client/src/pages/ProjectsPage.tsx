import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { Button } from '../components/ui/Button';
import Layout from '../components/Layout';

function ProjectsPage(): JSX.Element {
  const projects = useProjects();

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Projects</h1>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="flex items-center justify-between border p-2">
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
