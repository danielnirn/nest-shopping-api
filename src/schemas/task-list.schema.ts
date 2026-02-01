import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskListDocument = HydratedDocument<TaskList>;

@Schema()
export class TaskList {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Object], default: [] })
  tasks: Array<{
    id: number;
    title: string;
    completed: boolean;
  }>;
}

export const TaskListSchema = SchemaFactory.createForClass(TaskList);
