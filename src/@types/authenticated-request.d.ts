// src/@types/authenticated-request.d.ts
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}
