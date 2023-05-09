export const enum TaskReviewValidationMessage {
  MessageNotValid = 'Message should be from 50 to 500 symbols',
  RatingNotValid = 'Rating should be a number from 1 to 5'
}

export const enum TaskReviewException {
  Forbidden = 'You can make a review only for those executors who have done your task',
  Unauthorized = 'The user is unauthorized',
  NotExisted = 'The task is not existed',
  reviewExists = 'The review on this task already exists',
  Status = 'reviews could be created only for tasks with done status'
}

export const enum TaskReviewSetting {
  MessageMinLength = 50,
  MessageMaxLength = 500,
  RatingMinValue = 1,
  RatingMaxValue = 5,
}
