// src/events/guards/event-owner.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { EventService } from '../event.service';
import { Role } from '@prisma/client';
import { AuthenticatedRequest } from '@/auth/interfaces/authenticated-request.interface';

@Injectable()
export class EventOwnerGuard implements CanActivate {
  constructor(private readonly eventService: EventService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const eventId = parseInt(request.params.id, 10);
    const userId = request.user.id;
    const userRole = request.user.role;

    // Admins podem editar qualquer evento
    if (userRole === Role.ADMIN) {
      return true;
    }

    const event = await this.eventService.findOne(eventId);

    // Evento não existe
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    // Verificar se o usuário é o organizador do evento
    return event.organizerId === userId;
  }
}
