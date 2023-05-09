import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskReviewEntity } from './task-review.entity';
import { Review } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskReviewRepository implements CRUDRepository<TaskReviewEntity, number, Review> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskReviewEntity): Promise<Review> {
    const entityData = item.toObject();
    return await this.prisma.review.create({
      data: {
        ...entityData
      }
    });
  }

  public async destroy(responseId: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
        responseId,
      }
    });
  }

  public async findById(responseId: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: {
        responseId
      },
    });
  }

  public async findExisted(taskId: number, userId: string): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: {
        taskId,
        userId
      },
    });
  }

  public async update(responseId: number, item: TaskReviewEntity): Promise<Review> {
    const entityData = item.toObject();
    return await this.prisma.review.update({
      where: {
        responseId,
      },
      data: {
        ...entityData,
      }
    });
  }

  public async countRating(userId: string): Promise<number> {
    const ratingObj = await this.prisma.review.aggregate({
      _sum: {
        rating: true,
      },
      where: {
        userId,
        },
    });
    return ratingObj._sum.rating;
  }

  public async countReviews(userId: string): Promise<number> {
    const reviews = await this.prisma.review.findMany({
      where: {
        userId,
        },
    });
    return reviews.length;
  }
}
