import { CRUDRepository } from '@project/util/util-types';
import { TaskCommentEntity } from './task-comment.entity';
import { Comment } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { TaskCommentQuery } from './query/task-comment.query';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskCommentRepository implements CRUDRepository<TaskCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskCommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    return await this.prisma.comment.create({
      data: {
        ...entityData
      }
    });
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      }
    });
  }

  public async destroyByTaskId(taskId: number): Promise<void> {
    await this.prisma.comment.deleteMany({
      where: {
        taskId,
      }
    });
  }

  public async findById(commentId: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId
      },
    });
  }

  public async find({ limit, page }: TaskCommentQuery, taskId: number): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      where: {
        taskId
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(commentId: number, item: TaskCommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    return await this.prisma.comment.update({
      where: {
        commentId,
      },
      data: {
        ...entityData,
      }
    });
  }
}