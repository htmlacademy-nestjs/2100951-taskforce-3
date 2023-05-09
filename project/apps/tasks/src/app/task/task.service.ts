import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Task, TaskStatus, UserRole } from '@project/shared/app-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { JwtService } from '@nestjs/jwt';
import { TaskQuery } from './query/task.query';
import { TaskRepository } from './task.repository';
import { TaskException } from './task.constant';
import { UpdateTaskDto } from './dto/update-task.dto';
import { sortByStatus } from '@project/util/util-core';
import { CreateCommentDto } from '../task-comment/dto/create-comment.dto';
import { TaskCommentEntity } from '../task-comment/task-comment.entity';
import { TaskCommentRepository } from '../task-comment/task-comment.repository';
import { TaskCommentQuery } from '../task-comment/query/task-comment.query';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly jwtService: JwtService,
 ) { }

   async createTask(dto: CreateTaskDto, token?: string): Promise<Task> {
    const task = {
      ...dto,
    }
    const user = this.jwtService.decode(token);
  
    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Сustomer) {
      throw new ForbiddenException(TaskException.Forbidden);
    }
  
    const taskEntity = new TaskEntity(task);

    return this.taskRepository
      .create(taskEntity);
  }

  public async getNewTasks(query: TaskQuery, token?: string): Promise<Task[]> {
    const user = this.jwtService.decode(token);

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Executor) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    return this.taskRepository.find(query);
  }

  public async getMyTasks(query: TaskQuery, token?: string): Promise<Task[]> {
    const user = this.jwtService.decode(token);

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    const role = user['role'];
    const { status } = query;

    const tasks = await this.taskRepository.findMyTasks(role, user['sub'], status);

    return role === UserRole.Сustomer ? tasks
      : sortByStatus(tasks);
  }

  public async getTask(id: number): Promise<Task> {
    return await this.taskRepository.findById(id);
  }

  public async updateTask(id: number, dto: UpdateTaskDto, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Сustomer) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    const taskEntity = new TaskEntity({ ...task, ...dto });

    return this.taskRepository.update(id, taskEntity);
  }

  public async changeStatus(id: number, dto: UpdateTaskDto, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.taskRepository.findById(id);
    const taskEntity = new TaskEntity({ ...task, ...dto });

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if ((task.userId !== user['sub']) && (task.executorId !== user['sub'])) {
      throw new ForbiddenException(TaskException.ChangeStatusRight);
    }

    if ((user['role'] === UserRole.Сustomer) && (task.status === TaskStatus.New) && (dto.status === TaskStatus.Canceled)) {
      return this.taskRepository.update(id, taskEntity);
    } else if ((user['role'] === UserRole.Сustomer) && (task.status === TaskStatus.New) && (dto.status === TaskStatus.InWork)) {
      if (!dto.executorId) {
        throw new BadRequestException(TaskException.NotChooseExecutor);
      }

      return this.taskRepository.update(id, taskEntity);
    } else if ((user['role'] === UserRole.Сustomer) && (task.status === TaskStatus.InWork) && (dto.status === TaskStatus.Done)) {
      return this.taskRepository.update(id, taskEntity);
    } else if ((user['role'] === UserRole.Executor) && (task.status === TaskStatus.InWork) && (dto.status === TaskStatus.Failed)) {
      return this.taskRepository.update(id, taskEntity);
    } else {
      throw new BadRequestException(TaskException.IncorrectChangeStatus);
    }
  }


   async deleteTask(taskId: number, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Сustomer) {
      throw new ForbiddenException(TaskException.Forbidden);
    }
    
    this.taskRepository.destroy(taskId);
  }

  public async createComment(dto: CreateCommentDto, taskId: number, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    const commentEntity = new TaskCommentEntity({ ...dto, userId: user['sub'], taskId });

    return this.taskCommentRepository
      .create(commentEntity);
  }

  public async getComments(query: TaskCommentQuery, taskId: number) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    return this.taskCommentRepository.find(query, taskId);
  }
}
