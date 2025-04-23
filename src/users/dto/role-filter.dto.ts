// src/users/dto/role-filter.dto.ts
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class RoleFilterDto {
  @IsOptional()
  @IsEnum(Role, {
    message: 'Role inválido. Use ADMIN, ORGANIZER ou PARTICIPANT.',
  })
  role?: Role;
}
