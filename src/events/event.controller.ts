// src/events/event.controller.ts
import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.ORGANIZER)
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllEvents() {
    return this.eventService.findAll();
  }
}
