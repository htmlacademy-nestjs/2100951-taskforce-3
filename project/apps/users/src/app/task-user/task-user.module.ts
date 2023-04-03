import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserModel, TaskUserSchema } from './task-user.model.js';
import { TaskUserRepository } from './task-user.repository.js';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TaskUserModel.name, schema: TaskUserSchema }
  ])],
  providers: [TaskUserRepository],
  exports: [TaskUserRepository]
})
export class TaskUserModule {}