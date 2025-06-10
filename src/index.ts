import express from 'express';
import {
  signup,
  login,
} from './controllers/userController';
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
  inviteMember,
} from './controllers/projectController';
import {
  listTasks,
  createTask,
  updateTask,
} from './controllers/taskController';
import { getCalendar } from './controllers/calendarController';
import { listLogs } from './controllers/logController';
import { getDashboard } from './controllers/dashboardController';
import { authenticate } from './middleware/auth';

const app = express();
app.use(express.json());

app.post('/api/signup', signup);
app.post('/api/login', login);

app.use(authenticate);

app.get('/api/projects', listProjects);
app.post('/api/projects', createProject);
app.put('/api/projects/:id', updateProject);
app.delete('/api/projects/:id', deleteProject);
app.post('/api/projects/:id/invite', inviteMember);

app.get('/api/projects/:projectId/tasks', listTasks);
app.post('/api/projects/:projectId/tasks', createTask);
app.put('/api/tasks/:taskId', updateTask);

app.get('/api/calendar/:projectId', getCalendar);
app.get('/api/logs/:projectId', listLogs);
app.get('/api/dashboard', getDashboard);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Server startup logged for debugging
  console.log(`Server running on port ${PORT}`);
});
