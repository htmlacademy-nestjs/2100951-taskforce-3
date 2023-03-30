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
}
