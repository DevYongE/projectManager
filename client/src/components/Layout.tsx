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
    <div>
      <header className="flex items-center justify-between bg-gray-200 p-4">
        <Link to="/" className="font-bold">
          Project Manager
        </Link>
        {token && (
          <Button onClick={logout} type="button">
            Logout
          </Button>
        )}
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}

export default Layout;
