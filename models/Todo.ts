import mongoose, { Document, Schema, model } from "mongoose";

interface ITodo extends Document {
  title: string;
  isCompleted: boolean;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
