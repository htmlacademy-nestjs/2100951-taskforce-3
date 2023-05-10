import { Injectable } from '@nestjs/common';
import { Task } from '@project/shared/app-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { JwtService } from '@nestjs/jwt';
import { TaskQuery } from './query/task.query';
import { TaskRepository } from './task.repository';
import { UpdateTaskDto } from './dto/update-task.dto';
import { sortByStatus } from '@project/util/util-core';
import { CreateCommentDto } from '../task-comment/dto/create-comment.dto';
import { TaskCommentEntity } from '../task-comment/task-comment.entity';
import { TaskCommentRepository } from '../task-comment/task-comment.repository';
import { TaskCommentQuery } from '../task-comment/query/task-comment.query';
import { Update } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly jwtService: JwtService,
  ) { }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = {
      ...dto,
    }
    const taskEntity = new TaskEntity(task);

    return this.taskRepository
      .create(taskEntity);
  }

  public async changeStatus(id: number, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findById(id);
    const taskEntity = new TaskEntity({ ...task, ...dto });

    return this.taskRepository.update(id, taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  public async getNewTasks(query: TaskQuery): Promise<Task[]> {
    return this.taskRepository.find(query);
  }

  public async getMyTasks(query: TaskQuery, token?: string): Promise<Task[]> {
    const user = this.jwtService.decode(token);

    const role = user['role'];
    const { status } = query;

    const tasks = await this.taskRepository.findMyTasks(role, user['sub'], status);

    return sortByStatus(tasks);
  }

  public async getTask(id: number): Promise<Task> {
    return await this.taskRepository.findById(id);
  }

  async getUpdate(): Promise<Update[]> {
    return this.taskRepository.findUpdate();
  }

  public async updateTask(id: number, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findById(id);
    const taskEntity = new TaskEntity({ ...task, ...dto });

    return this.taskRepository.update(id, taskEntity);
  }

  public async createComment(dto: CreateCommentDto, taskId: number, token?: string) {
    const user = this.jwtService.decode(token);
    const commentEntity = new TaskCommentEntity({ ...dto, userId: user['sub'], taskId });

    return this.taskCommentRepository
      .create(commentEntity);
  }

  public async getComments(query: TaskCommentQuery, taskId: number) {
    return this.taskCommentRepository.find(query, taskId);
  }
}
