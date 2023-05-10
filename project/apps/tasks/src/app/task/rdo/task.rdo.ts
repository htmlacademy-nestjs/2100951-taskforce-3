import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {  CityType } from '@project/shared/app-types';
import { Category } from '@prisma/client';

export class TaskRdo {
  @ApiProperty({
    description: 'The unique task ID',
    example: '517854'
  })
  @Expose({name: '_id'})
  public taskId: number;

  @ApiProperty({
    description: 'Task title',
    example: 'Come up with a title'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Come up with a title for the article'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'service'
  })
  @Expose()
  public category: Category;

  @ApiProperty({
    description: 'Task price',
    example: 100
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '19.04.2025'
  })
  @Expose()
  public deadline: string;

  @ApiProperty({
    description: 'Task picture',
    example: '/img/img.png'
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Address',
    example: 'st. Pushkin, d.54'
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['title', 'easly', 'remote']
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Task city',
    example: 'Mosckow'
  })
  @Expose()
  public city: CityType;

  @ApiProperty({
    description: 'Task status',
    example: 'New'
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'User id',
    example: '12345'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Дата создания.',
    example: '2023-03-27'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления.',
    example: '2023-03-27'
  })
  @Expose()
  public publishAt: Date;

  @ApiProperty({
    description: 'Customer user id'
  })
  @Expose()
  public customerId: string;

  @ApiProperty({
    description: 'Executer user id'
  })
  @Expose()
  public executerId: string;
}
