import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'paulo@email.com' })
  email!: string;

  @ApiProperty({ example: 'Senha@Forte123' })
  password!: string;
}
