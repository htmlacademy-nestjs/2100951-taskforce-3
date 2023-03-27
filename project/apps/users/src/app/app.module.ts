import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module.js';
import { WorkplaceUserModule } from './blog-user/workplace-user.module.js';

@Module({
  imports: [AuthenticationModule, WorkplaceUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
