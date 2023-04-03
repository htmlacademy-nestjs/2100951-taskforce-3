import { City } from "./city.enum.js";
import { TaskStatus } from "./task-status.enum.js";

export interface Task {
    _id?: string;
    title: string;
    details: string;
    category: string;
    price?: number;
    deadline?: Date;
    image?: string;
    address?:string;  
    tags?: string[];
    city: City;
    status?: TaskStatus;
}