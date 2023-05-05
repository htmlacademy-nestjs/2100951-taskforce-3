export interface Comment {
  _id?: string;
  createdAt: Date;
  taskId?: number;
  message: string;
  userId: string;
}