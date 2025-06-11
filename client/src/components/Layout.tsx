import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props): JSX.Element {
  const { token, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/" className="text-lg font-bold">
            Project Manager
          </Link>
          {token && (
            <Button
              onClick={logout}
              type="button"
              className="bg-white/20 hover:bg-white/30"
            >
              Logout
            </Button>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-4">{children}</main>
    </div>
  );
}

export default Layout;
