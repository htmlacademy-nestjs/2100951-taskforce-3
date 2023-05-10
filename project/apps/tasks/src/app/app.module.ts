import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskCommentModule } from './task-comment/task-comment.module';
import { TaskReviewModule } from './task-review/task-review.module';
import { NotifyModule } from './notify/notify.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RolesGuard } from './authentication/guards/roles.guard';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';
import { ConfigTasksModule } from '@project/config/config-tasks';

@Module({
  imports: [
    AuthenticationModule,
    TaskModule,
    PrismaModule,
    TaskCategoryModule,
    TaskCommentModule,
    TaskReviewModule,
    NotifyModule,
    ConfigTasksModule
  ],
  controllers: [],
  providers: [
   JwtAuthGuard,
   RolesGuard
  ],
})
export class AppModule { }
