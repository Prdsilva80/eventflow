// src/registrations/dto/create-registration.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRegistrationDto {
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @IsInt()
  @IsNotEmpty()
  eventId!: number;
}
