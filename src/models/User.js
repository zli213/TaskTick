import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema({
  projectId: ObjectId,
  name: String,
  boards: [String],
  archived: Boolean,
});

const userSchema = new Schema(
  {
    _id: ObjectId,
    username: String,
    email: { type: String, required: true },
    // password: { type: String, required: true },
    password: String, // The third party login will not have password
    md5: String,
    encryptedKey: String,
    fullName: String,
    role: String,
    avatar_url: String,
    account_category: String, // Plus or Free
    themes: [String],
    projects: [projectSchema],
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
