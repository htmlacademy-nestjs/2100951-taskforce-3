import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, IsOptional, IsISO8601 } from 'class-validator';
import { COMMENT_NOT_VALID } from '../task-comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'easily'
  })
  @IsString()
  @Length(10, 300, {message: COMMENT_NOT_VALID})
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '156165'
  })
  @IsInt()
  public taskId: number;

  @ApiProperty({
    description: 'User ID',
    example: '234'
  })
  @IsInt()
  public userId: string;

  @ApiProperty({
    description: 'CreatedAt',
    example: '2023-12-07'
  })
  @IsOptional()
  @IsISO8601()
  public createdAt: Date;
}
