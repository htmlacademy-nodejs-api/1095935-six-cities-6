import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

import { IUser, TUserStatus } from "../../interfaces/user.js";
import { createSHA256 } from "../../utils/index.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: "users",
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements IUser {
  @prop({ required: true })
  public password: string;

  @prop({ required: true, default: "regular" })
  public status: TUserStatus;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: false })
  public avatar?: string;

  @prop({ required: true })
  public name: string;

  constructor(userData: IUser) {
    super();

    this.password = userData.password;
    this.status = userData.status;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
