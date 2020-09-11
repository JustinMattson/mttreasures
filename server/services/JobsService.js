import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class JobsService {
  async getActive(query = { jobStatus: "pending" }) {
    let jobs = await dbContext.Jobs.find({ jobStatus: "pending" }).populate(
      "creator",
      "name picture"
    );
    return jobs;
  }
  async getAll(query = {}) {
    let jobs = await dbContext.Jobs.find(query).populate(
      "creator",
      "name picture"
    );
    return jobs;
  }
  async getJobById(id) {
    let data = await dbContext.Jobs.findOne({ _id: id }).populate(
      "creator"
      // "name picture requesterRatings"
    );
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async getJobsByRequesterId(id) {
    let data = await dbContext.Jobs.find({ requesterId: id })
      .populate("creator", "name picture")
      .populate("volunteerIds");
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async getJobsByVolunteerId(id) {
    let data = await dbContext.Jobs.find({ volunteerIds: id }).populate(
      "creator",
      "name picture"
    );
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(rawData) {
    let data = await dbContext.Jobs.create(rawData);
    return data;
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Jobs.findOneAndUpdate(
      {
        _id: id,
        creatorEmail: userEmail,
      },
      update,
      {
        new: true,
      }
    );
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async changeJobStatus(update) {
    let data = await dbContext.Jobs.findByIdAndUpdate(update.id, update);
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  // async delete(id, userEmail) {
  //   let data = await dbContext.Jobs.findOneAndDelete({
  //     _id: id,
  //     creatorEmail: userEmail,
  //   });
  //   if (!data) {
  //     throw new BadRequest("Invalid ID");
  //   }
  //   return data;
  // }
  async updateJobVolunteers(obj) {
    await dbContext.Jobs.findByIdAndUpdate(
      { _id: obj.jobId },
      { $addToSet: { volunteerIds: obj.volunteerId } }
    );
  }
  async updateJobRating(obj) {
    await dbContext.Jobs.findByIdAndUpdate(
      { _id: obj.jobId },
      { $push: { jobCreatorRatings: obj.rating } }
    );
    await dbContext.Jobs.findByIdAndUpdate(
      { _id: obj.jobId },
      { $addToSet: { completedRequesterReviews: obj.userId } }
    );
  }
  async updateVolunteerRating(obj) {
    await dbContext.Jobs.findByIdAndUpdate(
      { _id: obj.jobId },
      { $push: { helperRatings: obj.rating } }
    );
    await dbContext.Jobs.findByIdAndUpdate(
      { _id: obj.jobId },
      { $addToSet: { completedVolunteerReviews: obj.recipientId } }
    );
  }
}

export const jobsService = new JobsService();
