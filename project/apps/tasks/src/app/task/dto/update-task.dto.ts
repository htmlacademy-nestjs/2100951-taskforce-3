import { ApiProperty } from "@nestjs/swagger";
import { Category, TaskStatus } from "@prisma/client";
import { IsString, Length, IsISO8601, IsPositive, IsOptional, IsEnum } from "class-validator";
import { minTitleLength, maxTitleLength, TASK_TITLE_LENGTH, minDescriptionLength, maxDescriptionLength, TASK_DESCRIPTION_LENGTH, TASK_DUEDATE_NOT_VALID, minAddressLength, maxAddressLength, TASK_ADDRESS_LENGTH, TASK_STATUS_NOT_VALID } from "../task.constant";

export class UpdateTaskDto {
    @ApiProperty({
        description: 'Task title',
        example: 'Come up with a title'
    })
    @IsOptional()
    @Length(minTitleLength, maxTitleLength, { message: TASK_TITLE_LENGTH })
    @IsString()
    public title: string;

    @ApiProperty({
        description: 'Task description',
        example: 'Come up with a title for the article'
    })
    @IsOptional()
    @Length(minDescriptionLength, maxDescriptionLength, { message: TASK_DESCRIPTION_LENGTH })
    @IsString()
    public description: string;

    @ApiProperty({
        description: 'Task category',
        example: 'service'
    })
    @IsOptional()
    public category: Category;

    @ApiProperty({
        description: 'Task price',
        example: 100
    })
    @IsOptional()
    @IsPositive()
    public price?: number;

    @ApiProperty({
        description: 'Task deadline',
        example: '2023-03-30'
    })
    @IsOptional()
    @IsISO8601({}, { message: TASK_DUEDATE_NOT_VALID })
    public deadline?: Date;

    @ApiProperty({
        description: 'Task picture',
        example: '/img/img.png'
    })
    @IsOptional()
    @IsString()
    public image?: string;

    @ApiProperty({
        description: 'Address',
        example: 'st. Pushkin, d.54'
    })
    @Length(minAddressLength, maxAddressLength, { message: TASK_ADDRESS_LENGTH })
    @IsString()
    @IsOptional()
    public address?: string;

    @ApiProperty({
        description: 'Task tags',
        example: ['title', 'easly', 'remote']
    })
    @IsOptional()
    public tags?: string[];

    @ApiProperty({
        description: 'Task city',
        example: 'Moscow',
    })
    @IsOptional()
    public city: string;

    @ApiProperty({
        description: 'Task status',
        example: 'Done'
    })
    @IsOptional()
    @IsEnum(TaskStatus, { message: TASK_STATUS_NOT_VALID })
    public status?: TaskStatus;

    @ApiProperty({
        description: 'ExecutorId',
        example: ' 6457ccd22d75f5c87f8b7657'
    })
    @IsOptional()
    public executorId?: string;
}