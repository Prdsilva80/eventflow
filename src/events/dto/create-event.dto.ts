// src/events/dto/create-event.dto.ts
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do evento é obrigatório.' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição do evento é obrigatória.' })
  @MinLength(10, { message: 'A descrição deve ter pelo menos 10 caracteres.' })
  @MaxLength(500, { message: 'A descrição pode ter no máximo 500 caracteres.' })
  description!: string;

  @IsDateString({}, { message: 'A data deve estar no formato ISO 8601.' })
  date!: string;

  @IsString()
  @IsNotEmpty({ message: 'A localização é obrigatória.' })
  @Length(3, 150, {
    message: 'A localização deve ter entre 3 e 150 caracteres.',
  })
  location!: string;

  @IsInt({ message: 'O ID do organizador deve ser um número inteiro.' })
  organizerId!: number;
}
