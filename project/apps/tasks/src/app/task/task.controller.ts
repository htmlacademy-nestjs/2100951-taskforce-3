import { Body, Controller, Post, Get, Param, HttpStatus, Delete, Query, Patch, Headers} from '@nestjs/common';
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

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

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
  public async changeStatus(@Param('id') id: number, @Body() dto: UpdateTaskDto, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const updatedTask = await this.taskService.changeStatus(id, dto, token);
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
  async index(@Query() query: TaskQuery, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const tasks = await this.taskService.getNewTasks(query, token);
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
  async showComments(@Query() query: TaskCommentQuery, @Param('taskId') taskId: number) {
    const comments = await this.taskService.getComments(query, taskId);
    return fillObject(TaskCommentRdo, comments);
  }
}
