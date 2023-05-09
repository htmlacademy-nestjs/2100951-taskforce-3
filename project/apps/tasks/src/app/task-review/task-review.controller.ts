import { Controller, Body, Post, HttpStatus, Param, Headers } from '@nestjs/common';
import { TaskReviewService } from './task-review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { fillObject } from '@project/util/util-core';
import { ReviewRdo } from './rdo/review.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class TaskReviewController {
  constructor(
    private readonly reviewService: TaskReviewService
  ) {}

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a review'
  })
  @Post(':taskId/:userId')
  public async create(@Body() dto: CreateReviewDto, @Param('taskId') taskId: number, @Param('userId') userId: string, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const newReview = await this.reviewService.createReview(dto, userId, taskId, token);
    return fillObject(ReviewRdo, newReview);
  }
}
