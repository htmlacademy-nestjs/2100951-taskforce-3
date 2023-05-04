import { ApiProperty } from '@nestjs/swagger';
import {  Category, City } from '@project/shared/app-types';
import { Length, IsString, IsPositive, IsISO8601 } from 'class-validator';
import { minTitleLength, maxTitleLength, TASK_TITLE_LENGTH, minDescriptionLength, maxDescriptionLength, TASK_DESCRIPTION_LENGTH, TASK_DUEDATE_NOT_VALID, minAddressLength, maxAddressLength, TASK_ADDRESS_LENGTH } from '../task.constant';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Come up with a title'
  })
  @Length(minTitleLength, maxTitleLength, { message: TASK_TITLE_LENGTH })
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Come up with a title for the article'
  })
  @Length(minDescriptionLength, maxDescriptionLength, { message: TASK_DESCRIPTION_LENGTH })
  @IsString()
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'service'
  })
  public category: Category;

  @ApiProperty({
    description: 'Task price',
    example: 100
  })
  @IsPositive()
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '19.04.2025'
  })
  @IsISO8601({}, { message: TASK_DUEDATE_NOT_VALID })
  public deadline?: Date;

  @ApiProperty({
    description: 'Task picture',
    example: '/img/img.png'
  })
  @IsString()
  public image?: string;

  @ApiProperty({
    description: 'Address',
    example: 'st. Pushkin, d.54'
  })
  @Length(minAddressLength, maxAddressLength, { message: TASK_ADDRESS_LENGTH })
  @IsString()
  public address?: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['title', 'easly', 'remote']
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Task city',
    example: 'Moscow',
  })
  public city: City;

  @ApiProperty({
    description: 'User Id',
    example: '12345',
  })
  public userId: string;
}
