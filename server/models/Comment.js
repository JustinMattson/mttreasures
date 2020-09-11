import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Comment = new Schema(
  {
    body: { type: String, required: true },
    jobId: { type: ObjectId, ref: "Jobs", required: true },
    creatorEmail: { type: String, required: true },
    profileId: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Comment;
