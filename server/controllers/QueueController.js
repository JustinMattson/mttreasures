import express from "express";
import BaseController from "../utils/BaseController";
import { queueService } from "../services/QueueService";
import { jobsService } from "../services/JobsService";
imporrt { Auth0Provider } from "@bcwdev/auth0provider";


export class QueueController extends BaseController {
  constructor() {
    super("api/queue");
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put("/:id/jobs", this.addVolunteerIdToJobQueue)
      .put("/:id", this.edit)
      .post("", this.create)
      .delete("/:id", this.delete);
  }


  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      req.body.volunteerEmail = req.userInfo.email;
      req.body.volunteerId = req.body.volunteerId
      let data = await queueService.create(req.body);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      // req.body.creatorEmail = req.userInfo.email;
      // queue only edited by requester front end

      let data = await queueService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await queueService.delete(req.params.id, req.userInfo.email);
      if (data) {
        res.send("Successfully deleted");
      }
    } catch (error) {
      next(error);
    }
  }
  async addVolunteerIdToJobQueue(req, res, next) {
    try {
      await jobsService.updateJobVolunteers(req.body)
    } catch (error) {
      next(error)
    }
  }
}

// getQueueByJobId
// getQueusByVolunteerId
