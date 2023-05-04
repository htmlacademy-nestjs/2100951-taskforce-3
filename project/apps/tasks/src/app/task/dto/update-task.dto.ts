export class UpdateTaskDto {
    public title?: string;
    public description?: string;
    public category?: string;
    public price?: number;
    public deadline?: Date;
    public status?: string;
    public image?: string;
    public address?: string;
    public tags?: string[];
    public city?: string;
}