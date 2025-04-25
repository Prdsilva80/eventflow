import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Paulo Silva' })
  name!: string;

  @ApiProperty({ example: 'paulo@email.com' })
  email!: string;

  @ApiProperty({ example: 'Senha@Forte123' })
  password!: string;
  role?: string;
}
