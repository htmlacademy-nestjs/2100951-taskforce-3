import { Module } from '@nestjs/common';
import { TaskUserMemoryRepository } from './task-user-memory.repository.js';

@Module({
    providers: [TaskUserMemoryRepository],
    exports: [TaskUserMemoryRepository]
  })
export class TaskUserModule {}