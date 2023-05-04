import { Category } from "./category.interface.js";
import { CityType } from "./city.enum.js";
import { Review } from "./review.interface.js";
import { TaskStatusType } from "./task-status.enum.js";

export interface Task {
    taskId?: number;
    title: string;
    description: string;
    category?: Category;
    price?: number;
    deadline?: Date;
    image?: string;
    address?:string;  
    tags?: string[];
    city?: CityType;
    status?: TaskStatusType;
    userId: string;
    createdAt: Date;
    publishAt: Date;
    review?: Review;
    comments?: Comment[]
}