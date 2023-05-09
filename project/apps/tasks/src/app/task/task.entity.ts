import { Task, Comment } from '@project/shared/app-types';

export class TaskEntity implements Task {
  public taskId: number;
  public title: string;
  public description: string;
  public categoryId: number;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: string;
  public status: string;
  public userId: string;
  public comments?: Comment[];
  public createdAt: Date;
  public publishAt: Date;
  public executorId?: string;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject() {
    return {
      ...this,
      comments: [...this.comments]
    };
  }

  public fillEntity(task: Task) {
    this.taskId = task.taskId;
    this.title = task.title;
    this.description = task.description;
    this.categoryId = task.categoryId;
    this.price = task.price;
    this.deadline = task.deadline;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.city = task.city;
    this.status = task.status;
    this.userId = task.userId;
    this.comments = [];
    this.createdAt = task.createdAt;
    this.publishAt = task.publishAt;
    this.executorId = task.executorId;
  }
}
