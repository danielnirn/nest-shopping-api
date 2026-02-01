import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ShoppingListDocument = HydratedDocument<ShoppingList>;

@Schema({ timestamps: true })
export class ShoppingList {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ default: false })
  completed: boolean;

  @Prop({
    type: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    default: [],
  })
  tasks: Array<{
    id: number;
    title: string;
    completed: boolean;
  }>;
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
