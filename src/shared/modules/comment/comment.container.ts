import { types } from "@typegoose/typegoose";
import { Container } from "inversify";

import { Component } from "../../interfaces/index.js";

import { ICommentService } from "./comment-service.interface.js";
import { DefaultCommentService } from "./comment.service.js";
import { CommentEntity, CommentModel } from "./comment.entity.js";

export const createCommentContainer = () => {
  const commentContainer = new Container();

  commentContainer
    .bind<ICommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();
  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
};
