import { Injectable } from '@nestjs/common';
import { TaskStatus } from '@project/shared/app-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskMemoryRepository } from './task-memory.repository';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskMemoryRepository,
 ) { }

  public async createTask(dto: CreateTaskDto) {
    const task = {
      ...dto,
      categoryId: 1,
      price: dto.price ?? 0,
      deadline: dto.deadline ?? null,
      image: dto.image ?? '',
      address: dto.address ?? '',
      tags: dto.tags ?? [],
      userId: '',
      status: TaskStatus.New,
    }

    const taskEntity = new TaskEntity(task);

    return this.taskRepository
      .create(taskEntity);
  }

  public async getTask(id: string) {
    return this.taskRepository.findById(id);
  }

  public async deleteTask(id: string) {
    this.taskRepository.destroy(id);
  }
}
