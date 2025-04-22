// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'fallbackSecret',
    };
    super(options);
  }

  validate(payload: { sub: number; email: string; role: string }): {
    userId: number;
    email: string;
    role: string;
  } {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
