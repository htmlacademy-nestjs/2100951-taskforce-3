import { Task, TaskStatus } from '@project/shared/app-types';
import {plainToInstance, ClassConstructor} from 'class-transformer';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export function sortByStatus(tasks: Task[]): Task[] {
  const order = [TaskStatus.New, TaskStatus.Canceled, TaskStatus.InWork, TaskStatus.Done, TaskStatus.Failed];
  const statusMap = TaskStatus;

  return tasks.sort((a, b) => {
      const aIndex = order.indexOf(statusMap[a.status]);
      const bIndex = order.indexOf(statusMap[b.status]);
      return aIndex - bIndex;
    });
}