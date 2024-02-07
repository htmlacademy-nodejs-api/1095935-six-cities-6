import { Container } from "inversify";
import { types } from "@typegoose/typegoose";

import { Component } from "../../interfaces/component.enum.js";

import { IUserService } from "./user-service.interface.js";
import { UserService } from "./user.service.js";
import { UserEntity, UserModel } from "./user.entity.js";

export const createUserContainer = () => {
  const userContainer = new Container();

  userContainer
    .bind<IUserService>(Component.UserService)
    .to(UserService)
    .inSingletonScope();

  userContainer
    .bind<types.ModelType<UserEntity>>(Component.UserModel)
    .toConstantValue(UserModel);

  return userContainer;
};
