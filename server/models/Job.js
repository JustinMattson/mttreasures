import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Job = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, default: "//placehold.it/200x200" },
    generalLocation: { type: String, required: true },
    estimatedHours: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    requesterId: { type: String, required: true },
    volunteerIds: [{ type: ObjectId, ref: "Profile" }],
    jobCreatorRatings: [{ type: String }], //job rating {volunteerId, Rating from Volunteer to job poster}
    helperRatings: [{ type: String }], //helper's rating {volunteerId, Rating from job poster to Volunteer}
    creatorEmail: { type: String, required: true },
    jobStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      required: true,
      default: "pending",
    },
    completedVolunteerReviews: [{ type: String }],
    completedRequesterReviews: [{ type: String }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Job.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Job;
