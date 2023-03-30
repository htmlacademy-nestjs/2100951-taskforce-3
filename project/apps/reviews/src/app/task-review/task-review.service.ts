import { Injectable } from '@nestjs/common';
import { TaskReviewMemoryRepository } from './task-review-memory.repository';
import { CreateReviewDto } from '../dto/create-review.dto';
import { TaskReviewEntity } from './task-review.entity';

@Injectable()
export class TaskReviewService {
  constructor(
    private readonly taskReviewRepository: TaskReviewMemoryRepository
  ) {}

  public async createReview(dto: CreateReviewDto) {
    const ReviewEntity = new TaskReviewEntity(dto);

    return this.taskReviewRepository
      .create(ReviewEntity);
  }
}
