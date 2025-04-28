import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PrismaModule } from '@/config/prisma/prisma.module';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/users/user.module';
import { EventController } from '@/events/event.controller';
import { EventService } from '@/events/event.service';
import { FeedbackController } from '@/feedback/feedback.controller';
import { ProfileController } from '@/profile/profile.controller';
import { NotificationController } from '@/notifications/notification.controller';
import { FeedbackService } from './feedback/feedback.service';
import { ProfileService } from './profile/profile.service';
import { NotificationService } from './notifications/notification.service';
import { ResendService } from './providers/resend.service';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [
    AppController,
    EventController,
    FeedbackController,
    ProfileController,
    NotificationController,
  ],
  providers: [
    AppService,
    EventService,
    FeedbackService,
    ProfileService,
    NotificationService,
    ResendService,
  ],
})
export class AppModule {}
