// src/events/event.service.ts
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from '@/events/dto/create-event.dto';

@Injectable()
export class EventService {
  private events = [
    { id: 1, name: 'Evento A', organizer: 'Admin' },
    { id: 2, name: 'Evento B', organizer: 'Organizer' },
  ];

  create(dto: CreateEventDto) {
    const newEvent = {
      id: this.events.length + 1,
      name: dto.name,
      organizer: dto.organizer,
    };

    this.events.push(newEvent);
    return { message: 'Evento criado com sucesso!', event: newEvent };
  }

  findAll() {
    return this.events;
  }
}
