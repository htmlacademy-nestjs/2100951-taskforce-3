export interface Comment {
  _id?: string;
  createdAt: Date;
  taskId?: string;
  message: string;
  userId: string;
}