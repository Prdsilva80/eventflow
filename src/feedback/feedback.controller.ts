// src/feedback/feedback.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from '@prisma/client';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto): Promise<Feedback> {
    return this.feedbackService.create(dto);
  }

  @Get()
  findAll(): Promise<Feedback[]> {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Feedback | null> {
    return this.feedbackService.findOne(Number(id));
  }
}
