import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'easily'
  })
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '156165'
  })
  public taskId: string;

  @ApiProperty({
    description: 'User ID',
    example: '234'
  })
  public userId: string;

  @ApiProperty({
    description: 'CreatedAt',
    example: '2023-12-07'
  })
  public createdAt: Date;
}
