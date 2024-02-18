import { inject, injectable } from "inversify";
import { DocumentType, types } from "@typegoose/typegoose";

import { Component } from "../../interfaces/index.js";
import { ILogger } from "../../libs/logger/index.js";

import { CreateUserDto } from "./dto/create-user.dto.js";

import { UserEntity } from "./user.entity.js";
import { IUserService } from "./user-service.interface.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async findById(
    userId: string
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(userId).exec();
  }

  public async findByEmail(
    email: string
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    return existedUser || this.create(dto, salt);
  }

  public async create(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`Новый пользователь создан: ${user.email}`);

    return result;
  }
}
