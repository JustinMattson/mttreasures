import express from "express";
import BaseController from "../utils/BaseController";
import { jobsService } from "../services/JobsService";
imporrt { auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get("", this.getAll)
      .delete("/:id", this.delete)
      .get("/:id", this.getCommentById)
      .put("/:id", this.edit)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      let data = await commentsService.getAll(req.query);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getCommentById(req, res, next) {
    try {
      let data = await commentsService.getCommentById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      req.body.profileId = req.userInfo.id;
      let data = await commentsService.create(req.body);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await commentsService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await commentsService.delete(req.params.id);
      if (data) {
        res.send("Successfully deleted");
      }
    } catch (error) {
      next(error);
    }
  }
}
