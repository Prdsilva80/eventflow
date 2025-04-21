import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from '../common/dto/login.dto';
import { RegisterDto } from '../common/dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CanActivate } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.register(data);
    return { message: 'Usuário criado com sucesso', user };
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Força o TypeScript a entender que é User completo (mesmo sem password)
    return this.authService.login(user as User);
  }

  @UseGuards(JwtAuthGuard as unknown as CanActivate)
  getProfile(@Req() req: Request & { user: Omit<User, 'password'> }) {
    return req.user;
  }
}
