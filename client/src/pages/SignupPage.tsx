import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Layout from '../components/Layout';

function SignupPage(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    await api('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, role: 'Member' }),
    });
    navigate('/login');
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
            Sign Up
          </Button>
        </form>
      </Card>
    </Layout>
  );
}

export default SignupPage;
