import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';

function ProjectsPage(): JSX.Element {
  const { projects, tasks } = useData();

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Projects</h1>
      <div className="space-y-2">
        {projects.map((p) => {
          const projectTasks = tasks.filter((t) => t.projectId === p.id);
          const done = projectTasks.filter((t) => t.status === 'Done').length;
          const progress =
            projectTasks.length > 0
              ? Math.round((done / projectTasks.length) * 100)
              : 0;
          return (
            <Card key={p.id} className="flex items-center justify-between p-2">
              <Link to={`/projects/${p.id}`}>{p.name}</Link>
              <span className="text-sm text-gray-500">{progress}%</span>
            </Card>
          );
        })}
      </div>
      <Link to="/">
        <Button className="mt-4">Back</Button>
      </Link>
    </Layout>
  );
}

export default ProjectsPage;
