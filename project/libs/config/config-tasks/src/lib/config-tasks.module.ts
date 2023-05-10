import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';

const ENV_USERS_FILE_PATH = 'apps/tasks/.tasks.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig, rabbitConfig],
      envFilePath: ENV_USERS_FILE_PATH
    })
  ]
})
export class ConfigTasksModule { }
