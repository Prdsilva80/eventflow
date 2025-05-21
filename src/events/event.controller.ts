// src/events/event.controller.ts (versão atualizada com paginação e guard)
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EventOwnerGuard } from './guards/event-owner.guard';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { Event } from '@prisma/client';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() dto: CreateEventDto): Promise<Event> {
    return this.eventService.create(dto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Event[]> {
    return this.eventService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(EventOwnerGuard)
  update(@Param('id') id: string, @Body() dto: UpdateEventDto): Promise<Event> {
    return this.eventService.update(Number(id), dto);
  }

  @Delete(':id')
  @UseGuards(EventOwnerGuard)
  remove(@Param('id') id: string): Promise<Event> {
    return this.eventService.remove(Number(id));
  }
}
