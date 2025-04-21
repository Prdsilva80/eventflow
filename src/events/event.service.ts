// src/events/event.service.ts
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  create(dto: CreateEventDto) {
    // Simulação de criação
    return { message: 'Evento criado com sucesso', event: dto };
  }
}
