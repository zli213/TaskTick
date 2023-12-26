import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const tasksSchema = new Schema(
  {
    _id: ObjectId,
    title: String,
    description: String,
    tags: [String],
    projectId: ObjectId,
    projectName: String,
    board: String,
    priority: {type: String, default: "P4"},
    dueDate: Date,
    time: String,
    userId: ObjectId,
    username: String,
    completed: Boolean,
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Tasks || mongoose.model("Tasks", tasksSchema);
