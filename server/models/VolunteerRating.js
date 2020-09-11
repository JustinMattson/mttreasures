import mongoose from "mongoose";
import Profile from "./Profile";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const RateVolunteer = new Schema(
  {
    profileId: { type: ObjectId, ref: "Profile", required: true },
    jobId: { type: String, required: true },
    rating: { type: Number },
    comment: { type: String },
    volunteerId: { type: String, required: true },
    requesterId: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

RateVolunteer.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default RateVolunteer;
