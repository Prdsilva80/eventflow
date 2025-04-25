// src/profile/dto/update-profile.dto.ts
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
