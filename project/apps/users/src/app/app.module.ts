import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module.js';
import { TaskUserModule } from './task-user/task-user.module.js';

@Module({
  imports: [AuthenticationModule, TaskUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
