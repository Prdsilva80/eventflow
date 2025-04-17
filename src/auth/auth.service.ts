import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import { User, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// DTOs for input data validation
interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

// Used for validation in auth.controller.ts or other files
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // If user is not found or password doesn't match
    if (!user) {
      return null;
    }

    // Compare provided password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    // Remove password from returned user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user in database
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || Role.PARTICIPANT,
      },
    });

    // Remove password from returned user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  login(user: User) {
    // Create payload for JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Return JWT token
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async findUserById(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }
}
