// src/providers/resend.service.ts
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class ResendService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.resend.emails.send({
      from: 'noreply@eventflow.com',
      to,
      subject,
      html,
    });
  }
}
