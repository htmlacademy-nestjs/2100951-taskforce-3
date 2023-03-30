import { TaskStatus, Task } from '@project/shared/app-types';

export class TaskEntity implements Task {
  public _id: string;
  public title: string;
  public details: string;
  public category: string;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: string;
  public status: TaskStatus;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(task: Task) {
    this._id = task._id;
    this.title = task.title;
    this.details = task.details;
    this.category = task.category;
    this.price = task.price;
    this.deadline = task.deadline;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.city = task.city;
    this.status = task.status;
  }
}
