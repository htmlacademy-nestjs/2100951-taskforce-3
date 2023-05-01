import { Module } from '@nestjs/common';
import { TaskUserModule } from '../task-user/task-user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtOptions } from '@project/config/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '../notify/notify.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module.js';

@Module({
    imports: [
        TaskUserModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: getJwtOptions
        }),
        NotifyModule,
        RefreshTokenModule,
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        JwtAccessStrategy,
        LocalStrategy,
        JwtRefreshStrategy
    ],
})
export class AuthenticationModule { }
