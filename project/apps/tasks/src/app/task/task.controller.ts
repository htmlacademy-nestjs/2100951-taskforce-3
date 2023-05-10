import { Body, Controller, Post, Get, Param, HttpStatus, Delete, Query, Patch, Headers, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TaskQuery } from './query/task.query';
import { TaskCommentQuery } from '../task-comment/query/task-comment.query';
import { TaskCommentRdo } from '../task-comment/rdo/task-comment.rdo';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateCommentDto } from '../task-comment/dto/create-comment.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { Roles } from './task.constant';
import { UserRole } from '@project/shared/app-types';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly notifyService: NotifyService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Newsletter to subscribers'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/notify')
  async sendNotifications() {
    const tasks = await this.taskService.getUpdate();
    await this.notifyService.sendNotifications({ ids: tasks.map((task) => task.taskId) });
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a task'
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Сustomer)
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The status has been successfully updated'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a task'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorrect status changing'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Patch('/:id/status')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Сustomer)
  public async changeStatus(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.changeStatus(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Tasks found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Get('/mytasks')
  async showMyTasks(@Query() query: TaskQuery, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const tasks = await this.taskService.getMyTasks(query, token);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id') id: number) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The user does not have enough rights to delete the task'
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Сustomer)
  public async delete(@Param('id') taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Tasks found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The user does not have enough rights to see new tasks'
  })
  @Get('/')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Executor)
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getNewTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    type: TaskCommentRdo,
    status: HttpStatus.CREATED,
    description: 'The comment has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a comment'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @Post('/:taskId/comments')
  @UseGuards(JwtAuthGuard)
  public async createComment(@Body() dto: CreateCommentDto, @Param('taskId') taskId: number, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const newComment = await this.taskService.createComment(dto, taskId, token);
    return fillObject(TaskCommentRdo, newComment);
  }

  @ApiResponse({
    type: TaskCommentRdo,
    status: HttpStatus.OK,
    description: 'Comments found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @Get('/:taskId/comments')
  @UseGuards(JwtAuthGuard)
  async showComments(@Query() query: TaskCommentQuery, @Param('taskId') taskId: number) {
    const comments = await this.taskService.getComments(query, taskId);
    return fillObject(TaskCommentRdo, comments);
  }
}
