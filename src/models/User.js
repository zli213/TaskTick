import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema({
  projectId: ObjectId,
  name: String,
  boards: [String],
});

const userSchema = new Schema(
  {
    _id: ObjectId,
    username: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    md5: String,
    encryptedKey: String,
    fullName: String,
    themes: [String],
    projects: [projectSchema],
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
