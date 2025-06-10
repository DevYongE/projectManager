import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { Button } from '../components/ui/Button';
import Layout from '../components/Layout';

function SignupPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        <Button type="submit">Sign Up</Button>
      </form>
    </Layout>
  );
}

export default SignupPage;
