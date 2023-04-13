import { ApiProperty } from '@nestjs/swagger';
import { City } from '@project/shared/app-types';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Come up with a title'
  })
  public title: string;

  @ApiProperty({
    description: 'Task details',
    example: 'Come up with a title for the article'
  })
  public details: string;

  @ApiProperty({
    description: 'Task category',
    example: 'service'
  })
  public category: string;

  @ApiProperty({
    description: 'Task price',
    example: 100
  })
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '19.04.2025'
  })
  public deadline?: Date;

  @ApiProperty({
    description: 'Task picture',
    example: '/img/img.png'
  })
  public image?: string;

  @ApiProperty({
    description: 'Address',
    example: 'st. Pushkin, d.54'
  })
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
}
