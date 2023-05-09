import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskCommentModule } from './task-comment/task-comment.module';
import { TaskReviewModule } from './task-review/task-review.module';

@Module({
  imports: [
    TaskModule,
    PrismaModule,
    TaskCategoryModule,
    TaskCommentModule,
    TaskReviewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
