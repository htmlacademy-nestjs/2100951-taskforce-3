import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review message',
    example: 'job well done'
  })
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  public taskId: string;

  @ApiProperty({
    description: 'Rating by the customer of the completed task',
    example: 5
  })
  public rating: number;
}
