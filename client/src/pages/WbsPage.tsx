import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

function WbsPage(): JSX.Element {
  const { id } = useParams();
  const { projects, tasks } = useData();
  const project = projects.find((p) => p.id === id) || null;

  if (!project) {
    return (
      <Layout>
        <div>Not found</div>
      </Layout>
    );
  }

  const start = new Date(project.startDate).getTime();
  const end = new Date(project.endDate).getTime();
  const total = end - start;
  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">{project.name} WBS</h1>
      <div className="space-y-4">
        {projectTasks.map((t) => {
          const due = t.dueDate ? new Date(t.dueDate).getTime() : start;
          const offset = total > 0 ? ((due - start) / total) * 100 : 0;
          return (
            <Card key={t.id} className="space-y-1 p-2">
              <div className="text-sm font-medium">{t.title}</div>
              <div className="relative h-2 rounded bg-gray-200">
                <div
                  className="h-2 rounded bg-indigo-500"
                  style={{ width: `${Math.min(Math.max(offset, 0), 100)}%` }}
                />
              </div>
            </Card>
          );
        })}
      </div>
      <Link to={`/projects/${project.id}`}>
        <Button className="mt-4">Back</Button>
      </Link>
    </Layout>
  );
}

export default WbsPage;
