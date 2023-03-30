import { Module } from '@nestjs/common';
import { TaskReviewController } from './task-review.controller';
import { TaskReviewService } from './task-review.service';
import { TaskReviewMemoryRepository } from './task-review-memory.repository';

@Module({
  controllers: [TaskReviewController],
  providers: [TaskReviewService, TaskReviewMemoryRepository],
})
export class TaskReviewModule {}
