import { Module } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskCategoryModule } from '../task-category/task-category.module';

@Module({
  imports: [TaskCategoryModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository]
})
export class TaskModule { }
