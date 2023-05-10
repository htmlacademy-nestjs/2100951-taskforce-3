import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskCommentModule } from './task-comment/task-comment.module';
import { TaskReviewModule } from './task-review/task-review.module';
import { NotifyModule } from './notify/notify.module.js';
import { AuthenticationModule } from './authentication/authentication.module.js';
import { RolesGuard } from './authentication/guards/roles.guard.js';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard.js';
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
