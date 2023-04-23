import { Category } from "./category.interface.js";
import { City } from "./city.enum.js";
import { Review } from "./review.interface.js";
import { TaskStatus } from "./task-status.enum.js";

export interface Task {
    id?: string;
    title: string;
    description: string;
    category: Category[];
    price?: number;
    deadline?: Date;
    image?: string;
    address?:string;  
    tags?: string[];
    city: City;
    status?: TaskStatus;
    userId: string;
    review?: Review;
    comments?: Comment[]
}