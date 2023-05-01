import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { TaskController } from './task-controller.js';
import { HTTP_CLIENT_TIMEOUT, HTTP_CLIENT_MAX_REDIRECTS } from './app.config.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UsersController,
    TaskController,
  ],
  providers: [],
})
export class AppModule { }