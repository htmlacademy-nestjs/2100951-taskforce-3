import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskReviewRepository } from './task-review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { TaskReviewEntity } from './task-review.entity';
import { TaskRepository } from '../task/task.repository';
import { TaskReviewException } from './task-review.constant';
import { JwtService } from '@nestjs/jwt';
import { TaskStatus } from '@project/shared/app-types';

@Injectable()
export class TaskReviewService {
  constructor(
    private readonly TaskReviewRepository: TaskReviewRepository,
    private readonly taskRepository: TaskRepository,
    private readonly jwtService: JwtService
  ) { }

  public async createReview(dto: CreateReviewDto, userId: string, taskId: number, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.taskRepository.findById(taskId);
    const existedReview = await this.TaskReviewRepository.findExisted(taskId, userId);

    if (!user) {
      throw new UnauthorizedException(TaskReviewException.Unauthorized);
    }

    if (!task) {
      throw new BadRequestException(TaskReviewException.NotExisted);
    }

    if (!(task.status === TaskStatus.Done)) {
      throw new ForbiddenException(TaskReviewException.Status);
    }

    if (task.executorId !== userId) {
      throw new ForbiddenException(TaskReviewException.Forbidden);
    }

    if (existedReview) {
      throw new BadRequestException(TaskReviewException.ReviewExists);
    }

    const review = { ...dto, userId, taskId }
    const reviewEntity = new TaskReviewEntity(review);

    return this.TaskReviewRepository
      .create(reviewEntity);
  }

  public async countRating(userId: string) {
    const ratingsSum = await this.TaskReviewRepository.countRating(userId);
    const reviewsAmount = await this.TaskReviewRepository.countReviews(userId);
    const failedTasksAmount = await this.taskRepository.countExecutorFailedTasks(userId);

    return (ratingsSum / (reviewsAmount + failedTasksAmount));
  }
}
