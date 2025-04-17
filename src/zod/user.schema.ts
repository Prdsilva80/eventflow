import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/, 'Deve conter uma letra maiúscula'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
