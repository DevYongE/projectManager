import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import { users } from '../store';
import type { Request, Response } from 'express';
import type { Role, User } from '../types/user';
import { signToken } from '../middleware/auth';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body as {
    username: string;
    password: string;
    role: Role;
  };
  const existing = users.find((u) => u.username === username);
  if (existing) {
    res.status(409).json({ message: 'User exists' });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = { id: uuid(), username, passwordHash, role };
  users.push(user);
  res.json({ token: signToken(user) });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  res.json({ token: signToken(user) });
};
