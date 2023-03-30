import { Controller, Body, Post, HttpStatus } from '@nestjs/common';
import { TaskReviewService } from './task-review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { fillObject } from '@project/util/util-core';
import { ReviewRdo } from '../rdo/review.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('Reviews')
export class TaskReviewController {
  constructor(
    private readonly reviewService: TaskReviewService
  ) {}

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The new Review has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a Review'
  })
  @Post()
  public async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.createReview(dto);
    return fillObject(ReviewRdo, newReview);
  }
}
