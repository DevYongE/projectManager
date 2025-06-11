import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';
import { AddProjectModal } from '../components/AddProjectModal';

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
