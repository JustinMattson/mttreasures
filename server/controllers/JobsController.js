import express from "express";
import BaseController from "../utils/BaseController";
import { jobsService } from "../services/JobsService";
import auth0Provider from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { queueService } from "../services/QueueService";
import socketService from "../services/SocketService";

export class JobsController extends BaseController {
  constructor() {
    super("api/jobs");
    this.router
      .get("", this.getActive)
      .get("/all", this.getAll)
      .get("/:id", this.getJobById)
      .put("/:id/expire", this.changeJobStatus)
      .use(auth0Provider.getAuthorizedUserInfo)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get("/:id/comments", this.getCommentsByJobId)
      .get("/:id/queue", this.getQueuesByJobId)
      .put("/:id", this.edit)
      .post("", this.create);
    // .delete("/:id", this.delete);
  }

  async getActive(req, res, next) {
    try {
      let data = await jobsService.getActive(req.query);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await jobsService.getAll(req.query);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getJobById(req, res, next) {
    try {
      let data = await jobsService.getJobById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getQueuesByJobId(req, res, next) {
    try {
      let data = await queueService.getQueuesByJobId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByJobId(req, res, next) {
    try {
      let data = await commentsService.getCommentsByJobId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      // req.body.requesterId = req.userInfo.id;
      // REVIEW the line above was assigning some different auth0 id making it not possible to link the requesterId to the creator.id.
      let data = await jobsService.create(req.body);
      socketService.messageRoom("requests", "newJob", data);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      // req.body.creatorEmail = req.userInfo.email;
      let data = await jobsService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      socketService.messageRoom("requests", "editJob", data);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async changeJobStatus(req, res, next) {
    try {
      let data = await jobsService.changeJobStatus(req.body);
      socketService.messageRoom("requests", "updateJobStatus", data);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // async delete(req, res, next) {
  //   try {
  //     let data = await jobsService.delete(req.params.id, req.userInfo.email);
  //     if (data) {
  //       res.send("Successfully deleted");
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
