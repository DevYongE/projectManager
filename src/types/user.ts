export type Role = 'Admin' | 'Member';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: Role;
}
