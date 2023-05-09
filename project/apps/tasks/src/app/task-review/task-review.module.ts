import { Module } from '@nestjs/common';
import { TaskReviewController } from './task-review.controller';
import { TaskReviewService } from './task-review.service';
import { TaskReviewRepository } from './task-review.repository';
import { TaskModule } from '../task/task.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TaskModule],
  controllers: [TaskReviewController],
  providers: [TaskReviewService, TaskReviewRepository, JwtService],
})
export class TaskReviewModule {}
