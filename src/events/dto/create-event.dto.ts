// src/events/dto/create-event.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'A descrição deve ter pelo menos 10 caracteres' })
  description!: string;

  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'A capacidade deve ser pelo menos 1' })
  capacity?: number;

  @IsInt()
  @IsNotEmpty()
  organizerId!: number;
}
