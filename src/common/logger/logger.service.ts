// src/common/logger/logger.service.ts
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private context?: string;

  setContext(context: string): void {
    this.context = context;
  }

  log(message: unknown, context?: string): void {
    console.log(this.formatMessage('INFO', message, context || this.context));
  }

  error(message: unknown, trace?: string, context?: string): void {
    console.error(
      this.formatMessage('ERROR', message, context || this.context),
    );
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: unknown, context?: string): void {
    console.warn(this.formatMessage('WARN', message, context || this.context));
  }

  debug(message: unknown, context?: string): void {
    console.debug(
      this.formatMessage('DEBUG', message, context || this.context),
    );
  }

  private formatMessage(level: string, message: unknown, context?: string) {
    return {
      timestamp: new Date().toISOString(),
      level,
      context,
      message: typeof message === 'object' ? JSON.stringify(message) : message,
    };
  }
}
