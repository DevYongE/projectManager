import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { User } from '../types/user';

const secret = 'secret-key';

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const decoded = jwt.verify(token, secret) as User;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const signToken = (user: User): string =>
  jwt.sign(user, secret, { expiresIn: '1h' });
