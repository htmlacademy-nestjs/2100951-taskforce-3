import { Module } from '@nestjs/common';
import { TaskMemoryRepository } from './task-memory.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskMemoryRepository]
})
export class TaskModule {}
