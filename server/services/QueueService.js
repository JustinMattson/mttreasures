import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class QueueService {
  async getQueuesByJobId(id) {
    let data = await dbContext.Queues.find({ jobId: id }).populate(
      "creator",
      "name picture"
    );
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }

  //need to create a queue to see what the id below is called...
  //this is for the profile
  async getQueuesByVolunteerId(id) {
    let data = await dbContext.Queues.find({ volunteerId: id }).populate(
      "creator",
      "name picture").populate(
        "jobId"
      )
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(rawData) {
    let data = await dbContext.Queues.create(rawData);
    return data;
  }
  async edit(id, update) {
    let data = await dbContext.Queues.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async delete(id, userEmail) {
    let data = await dbContext.Queues.findOneAndDelete({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
}

export const queueService = new QueueService();
