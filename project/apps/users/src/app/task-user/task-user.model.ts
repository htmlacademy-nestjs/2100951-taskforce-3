import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City, CityType, User, UserRole } from '@project/shared/app-types';

@Schema({
    collection: 'users',
    timestamps: true,
})

export class TaskUserModel extends Document implements User {

    @Prop()
    public avatar: string;

    @Prop({
        required: true,
    })
    public dateBirth: Date;

    @Prop({
        required: true,
        unique: true,
    })
    public email: string;

    @Prop({
        required: true,
    })
    public firstname: string;

    @Prop({
        required: true,
    })
    public lastname: string;

    @Prop({
        required: true,
    })
    public passwordHash: string;

    @Prop({
        required: true,
        type: String,
        enum: UserRole,
        default: UserRole.Executor,
    })
    public role: UserRole;

    @Prop({
        required: true,
        type: String,
        enum: City,
        default: 'Moscow',
    })
    public city: CityType;
}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);