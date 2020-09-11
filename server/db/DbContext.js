import mongoose from "mongoose";
// import ValueSchema from "../models/Value";
import JobSchema from "../models/Job";
import CommentSchema from "../models/Comment";
import ProfileSchema from "../models/Profile";
import QueueSchema from "../models/Queue";
import RequesterSchema from "../models/RequesterRating";
import VolunteerSchema from "../models/VolunteerRating";

class DbContext {
  // Values = mongoose.model("Value", ValueSchema);
  Jobs = mongoose.model("Jobs", JobSchema);
  Comments = mongoose.model("Comments", CommentSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Queues = mongoose.model("Queue", QueueSchema);
  RequesterRating = mongoose.model("RequesterRating", RequesterSchema);
  VolunteerRating = mongoose.model("VolunteerRating", VolunteerSchema);
}

export const dbContext = new DbContext();
