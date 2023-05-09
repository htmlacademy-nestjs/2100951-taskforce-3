import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewRdo {
  @ApiProperty({
    description: 'The unique review id',
    example: '123'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Review message',
    example: 'Задание выполнено качественно и в срок'
  })
  @Expose()
  message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  @Expose()
  taskId: string;

  @ApiProperty({
    description: 'User ID',
    example: '6452ca1f33bbee8ea383010e'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Evaluation by the customer of the completed task',
    example: 5
  })
  @Expose()
  rating: number;
}
