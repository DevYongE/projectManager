import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';

function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const data = await api<{ token: string }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    login(data.token);
    navigate('/');
  }

  return (
    <Layout>
      <Card className="mx-auto mt-20 max-w-sm space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded border p-2"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Username"
          />
          <input
            className="w-full rounded border p-2"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </Layout>
  );
}

export default LoginPage;
