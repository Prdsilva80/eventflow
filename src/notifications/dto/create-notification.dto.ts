// src/notifications/dto/create-notification.dto.ts
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsInt()
  userId!: number;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
