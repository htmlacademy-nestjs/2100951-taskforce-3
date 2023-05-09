import { Comment } from "./comment.interface";
import { Review } from "./review.interface";

export interface Task {
    taskId?: number;
    title: string;
    description: string;
    categoryId?: number;
    price?: number;
    deadline?: Date;
    image?: string;
    address?:string;  
    tags?: string[];
    city?: string;
    status?: string;
    userId: string;
    createdAt: Date;
    publishAt: Date;
    review?: Review;
    executorId?: string;
    comments?: Comment[]
}