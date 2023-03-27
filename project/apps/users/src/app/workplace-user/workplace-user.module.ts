import { Module } from '@nestjs/common';
import { WorkplaceUserMemoryRepository } from './workplace-user-memory.repository.js';

@Module({
    providers: [WorkplaceUserMemoryRepository],
    exports: [WorkplaceUserMemoryRepository]
  })
export class WorkplaceUserModule {}