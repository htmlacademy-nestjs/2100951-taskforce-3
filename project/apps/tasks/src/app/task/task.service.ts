import { Injectable } from '@nestjs/common';
import { Task } from '@project/shared/app-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TaskQuery } from './query/task.query';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
 ) { }

   async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = {
      ...dto,
    }

    const taskEntity = new TaskEntity(task);

    return this.taskRepository
      .create(taskEntity);
  }

   async getTask(id: number) {
    return this.taskRepository.findById(id);
  }

  async getTasks(query: TaskQuery): Promise<Task[]> {
    return this.taskRepository.find(query);
  }

   async deleteTask(id: number) {
    this.taskRepository.destroy(id);
  }
}
