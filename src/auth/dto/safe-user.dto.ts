import { Role } from '@prisma/client';

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  role: Role;
}
