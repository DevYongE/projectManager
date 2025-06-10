import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { Button } from '../components/ui/Button';
import Layout from '../components/Layout';

function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-20 max-w-sm space-y-4"
      >
        <input
          className="border p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="border p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button type="submit">Login</Button>
      </form>
    </Layout>
  );
}

export default LoginPage;
