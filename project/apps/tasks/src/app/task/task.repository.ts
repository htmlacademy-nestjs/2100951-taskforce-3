import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from './task.entity';
import { Task } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return await this.prisma.task.create({
      data: {
        ...entityData,
      },
      include: {
        category: true,
      }
    });
}

  public async destroy(taskId: number): Promise < void> {
  await this.prisma.task.delete({
    where: {
      taskId,
    }
  });
}

  public async findById(taskId: number): Promise < Task | null > {
  return this.prisma.task.findFirst({
    where: {
      taskId
    },
    include: {
      comments: true,
      category: true,
    }
  });
}

  public async find({ limit, category, city, sortDirection, page }: TaskQuery): Promise < Task[] > {
  return await this.prisma.task.findMany({
    where: {
      category: {
        is: {
          categoryId: category,
        },
      },
      city: {
        equals: city,
      }
    },
    take: limit,
    include: {
      comments: true,
      category: true,
    },
    orderBy: [
      { createdAt: sortDirection }
    ],
    skip: page > 0 ? limit * (page - 1) : undefined,
  });
}

  public update(taskId: number, _item: TaskEntity): Promise < Task > {
  return Promise.resolve(undefined);
}
}