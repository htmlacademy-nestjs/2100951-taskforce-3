import { Module } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    AuthenticationModule,
    TaskCategoryModule,
    NotifyModule
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository, TaskService]
})
export class TaskModule { }
