import { Review } from '@project/shared/app-types';

export class TaskReviewEntity implements Review {
  public _id: string;
  public message: string;
  public taskId: number;
  public rating: number;

  constructor(taskReview: Review) {
    this.fillEntity(taskReview);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(taskReview: Review) {
    this._id = taskReview._id;
    this.message = taskReview.message;
    this.taskId = taskReview.taskId;
    this.rating = taskReview.rating;
  }
}
