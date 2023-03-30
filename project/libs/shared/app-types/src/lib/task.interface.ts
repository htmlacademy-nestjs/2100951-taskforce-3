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
    city?: string;
    status: TaskStatus;
}