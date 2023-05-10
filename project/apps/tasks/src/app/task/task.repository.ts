import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from './task.entity';
import { Task, UserRole } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';
import { City, TaskStatus, Update } from '@prisma/client';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
  
    return await this.prisma.task.create({
      data: {
        title: entityData.title,
        description: entityData.description,
        categoryId: entityData.categoryId,
        price: entityData.price,
        deadline: entityData.deadline,
        image: entityData.image,
        address: entityData.address,
        tags: entityData.tags,
        city: entityData.city as City,
        status: entityData.status as TaskStatus,
        userId: entityData.userId,
        executorId: entityData.executorId,
        comments: {
          create: [],
        }
      },
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
      category: true,
    }
  });
}

  public async find({ limit, categoryId, city, sortDirection, page }: TaskQuery): Promise < Task[] > {
  return await this.prisma.task.findMany({
    where: {
      category: {
        is: {
          categoryId: categoryId,
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

public async update(taskId: number, item: TaskEntity): Promise<Task> {
  const entityData = item.toObject();
  return await this.prisma.task.update({
    where: {
      taskId,
    },
    data: {
      title: entityData.title,
      description: entityData.description,
      categoryId: entityData.categoryId,
      price: entityData.price,
      deadline: entityData.deadline,
      image: entityData.image,
      address: entityData.address,
      tags: entityData.tags,
      city: entityData.city as City,
      status: entityData.status as TaskStatus,
      userId: entityData.userId,
      executorId: entityData.executorId,
    },
    include: {
      category: true,
    }
  });
}

public async findUpdate(): Promise<Update[]> {
  const updateTasks = await this.prisma.update.findMany({
    where: {},
    select: {
      taskId: true
    }
  });
  updateTasks.map(async (task) => await this.prisma.update.delete({ where: { taskId: task.taskId } }));
  return updateTasks;
}

public async findMyTasks(role: UserRole, id: string, status?: TaskStatus): Promise<Task[]> {
  let tasks: Task[];
  if (role === UserRole.Сustomer) {
    tasks = await this.prisma.task.findMany({
      where: {
        userId: id,
        status,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else {
    tasks = await this.prisma.task.findMany({
      where: {
        executorId: id,
        status,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  return tasks.map((task) => ({
    ...task,
    commentsAmount: task.comments?.length || 0,
  }));
}

public async countExecutorFailedTasks(userId: string): Promise<number> {
  const failedTasks = await this.prisma.task.findMany({
    where: {
      status: 'Failed',
      executorId: userId
    }
  });
  return failedTasks.length;
}
}