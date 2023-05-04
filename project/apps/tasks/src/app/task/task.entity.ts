import { TaskStatus, Task, City, Category } from '@project/shared/app-types';

export class TaskEntity implements Task {
  public taskId: number;
  public title: string;
  public description: string;
  public category: Category;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: City;
  public status: TaskStatus;
  public userId: string;
  public comments?: Comment[];

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject() {
    return {
      ...this,
      category: this.category,
      comments: [...this.comments]
    };
  }

  public fillEntity(task: Task) {
    this.taskId = task.taskId;
    this.title = task.title;
    this.description = task.description;
    this.category = task.category;
    this.price = task.price;
    this.deadline = task.deadline;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.city = task.city;
    this.status = task.status;
    this.userId = task.userId;
    this.comments = [];
  }
}
