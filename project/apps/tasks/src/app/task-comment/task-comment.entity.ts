import { Comment } from '@project/shared/app-types';

export class TaskCommentEntity implements Comment {
  public _id?: string;
  public createdAt: Date;
  public userId: string;
  public message: string;
  public taskId: number;

  constructor(taskComment: Comment) {
    this.fillEntity(taskComment);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(taskComment: Comment) {
    this._id = taskComment._id;
    this.createdAt = taskComment.createdAt;
    this.userId = taskComment.userId;
    this.message = taskComment.message;
    this.taskId = taskComment.taskId;
  }
}
