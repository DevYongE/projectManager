import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Layout from '../components/Layout';
import { AddProjectModal } from '../components/AddProjectModal';
import Calendar from '../components/Calendar';

function DashboardPage(): JSX.Element {
  const { projects, tasks, addProject } = useData();
  const [showModal, setShowModal] = useState(false);
  const now = new Date();
  const active = projects.filter(
    (p) => new Date(p.startDate) <= now && new Date(p.endDate) >= now,
  );

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">Dashboard</h1>
      <Button className="mb-4" onClick={() => setShowModal(true)}>
        프로젝트 등록
      </Button>
      {showModal && (
        <AddProjectModal
          onAdd={addProject}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="space-y-2">
        {active.slice(0, 5).map((p) => {
          const projectTasks = tasks.filter((t) => t.projectId === p.id);
          const done = projectTasks.filter((t) => t.status === 'Done').length;
          const progress =
            projectTasks.length > 0
              ? Math.round((done / projectTasks.length) * 100)
              : 0;
          return (
            <Card key={p.id} className="space-y-1 p-2">
              <div className="flex items-center justify-between">
                <span>
                  {p.name}
                  <span className="ml-1 text-sm text-gray-500">
                    ({projectTasks.length})
                  </span>
                </span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <ProgressBar value={progress} />
            </Card>
          );
        })}
      </div>
      <Calendar projects={projects} />
      <Link to="/projects">
        <Button className="mt-4">View Projects</Button>
      </Link>
    </Layout>
  );
}

export default DashboardPage;
