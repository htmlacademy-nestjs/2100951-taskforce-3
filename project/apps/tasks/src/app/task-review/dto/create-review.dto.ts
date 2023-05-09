import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min, Max } from 'class-validator';
import { TaskReviewValidationMessage, TaskReviewSetting } from '../task-review.constant';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review message',
    example: 'Задание выполнено качественно и в срок'
  })
  @IsString()
  @Length(TaskReviewSetting.MessageMinLength, TaskReviewSetting.MessageMaxLength, {message: TaskReviewValidationMessage.MessageNotValid })
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  @IsInt()
  public taskId: number;

  @ApiProperty({
    description: 'Evaluation by the customer of the completed task',
    example: 5
  })
  @IsInt()
  @Min(TaskReviewSetting.RatingMinValue, {message: TaskReviewValidationMessage.RatingNotValid})
  @Max(TaskReviewSetting.RatingMaxValue, {message: TaskReviewValidationMessage.RatingNotValid})
  public rating: number;
}
