import { Review } from '@project/shared/app-types';

export class TaskReviewEntity implements Review {
  public id: number;
  public message: string;
  public taskId: number;
  public userId: string;
  public rating: number;

  constructor(taskReview: Review) {
    this.fillEntity(taskReview);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(taskReview: Review) {
    this.id = taskReview.id;
    this.message = taskReview.message;
    this.taskId = taskReview.taskId;
    this.userId = taskReview.userId;
    this.rating = taskReview.rating;
  }
}
