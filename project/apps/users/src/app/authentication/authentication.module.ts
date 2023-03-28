import { Module } from '@nestjs/common';
import { TaskUserModule } from '../task-user/task-user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [TaskUserModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule { }
