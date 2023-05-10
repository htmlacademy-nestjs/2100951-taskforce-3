import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-tasks';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/app-types';
import { TasksDto } from './dto/tasks.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) { }

  public async sendNotifications(dto: TasksDto) {
    return this.rabbitClient.publish<TasksDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.SendNotifications,
      { ids: dto.ids.map((id) => id) }
    );
  }
}
