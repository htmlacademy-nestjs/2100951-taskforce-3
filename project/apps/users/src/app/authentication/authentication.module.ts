import { Module } from '@nestjs/common';
import { WorkplaceUserModule } from '../workplace-user/workplace-user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [WorkplaceUserModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule { }
