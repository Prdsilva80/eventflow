// src/registrations/registration.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Registration } from '@prisma/client';

@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  create(@Body() dto: CreateRegistrationDto): Promise<Registration> {
    return this.registrationService.create(dto);
  }

  @Get()
  findAll(): Promise<Registration[]> {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Registration | null> {
    return this.registrationService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Registration> {
    return this.registrationService.remove(Number(id));
  }
}
