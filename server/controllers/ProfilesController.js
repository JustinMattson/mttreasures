import express from "express";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { queueService } from "../services/QueueService";
import { profilesService } from "../services/ProfilesService";
import { jobsService } from "../services/JobsService";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .get("/:id/jobs", this.getJobsByVolunteerId)
      .get("/:id/myJobs", this.getJobsByRequesterId)
      .get("/:id/queue", this.getQueuesByVolunteerId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get("/:id", this.getProfileById)
      .get("", this.getUserProfile)
      .put("/:id", this.edit);
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await profilesService.updateProfile(
        req.userInfo.email,
        req.body
      );
      // req.body.creatorId = req.user.sub;
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await profilesService.getAll(req.query);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getProfileById(req, res, next) {
    try {
      let data = await profilesService.getProfileById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getQueuesByVolunteerId(req, res, next) {
    try {
      let data = await queueService.getQueuesByVolunteerId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getJobsByVolunteerId(req, res, next) {
    try {
      let data = await jobsService.getJobsByVolunteerId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getJobsByRequesterId(req, res, next) {
    try {
      let data = await jobsService.getJobsByRequesterId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
