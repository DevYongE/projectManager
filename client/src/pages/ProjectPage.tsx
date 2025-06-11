import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Task } from '../types';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';

function ProjectPage(): JSX.Element {
  const { id } = useParams();
  const { projects, tasks, addTask, updateTaskStatus } = useData();
  const project = projects.find((p) => p.id === id) || null;
  const projectTasks = tasks.filter((t) => t.projectId === id);
  const [title, setTitle] = useState<string>('');

  if (!project) {
    return (
      <Layout>
        <div>Not found</div>
      </Layout>
    );
  }

  function handleAdd(e: React.FormEvent): void {
    e.preventDefault();
    if (!id || !title) return;
    addTask(id, title);
    setTitle('');
  }

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold">{project.name}</h1>
      <Card className="mb-4 space-y-1 text-sm">
        <div>
          <strong>유형:</strong> {project.type}
        </div>
        <div>
          <strong>기간:</strong> {project.startDate} ~ {project.endDate}
        </div>
        <div>
          <strong>내용:</strong> {project.description}
        </div>
        <div>
          <strong>OS:</strong> {project.os}
        </div>
        <div>
          <strong>총 메모리:</strong> {project.totalMemory}
        </div>
        <div>
          <strong>가용 메모리:</strong> {project.availableMemory}
        </div>
        <div>
          <strong>요청 사항:</strong> {project.requestDetail}
        </div>
      </Card>
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="flex-1 rounded border p-2"
          placeholder="New task"
        />
        <Button type="submit">Add</Button>
      </form>
      <div className="space-y-2">
        {projectTasks.map((t) => (
          <Card key={t.id} className="flex items-center justify-between p-2">
            <span>
              {t.title} - {t.status}
            </span>
            <select
              value={t.status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateTaskStatus(t.id, e.target.value as Task['status'])
              }
              className="rounded border p-1 text-sm"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </Card>
        ))}
      </div>
      <Link to="/projects">
        <Button className="mt-4">Back</Button>
      </Link>
    </Layout>
  );
}

export default ProjectPage;
