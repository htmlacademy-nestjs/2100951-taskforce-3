import { TaskTagRepository } from './task-tag.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [TaskTagRepository],
  exports: [TaskTagRepository]
})
export class TaskTagModule { }
