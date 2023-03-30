import { Module } from '@nestjs/common';
import { TaskReviewModule } from './task-review/task-review.module';

@Module({
  imports: [TaskReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
