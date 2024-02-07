import { TUserStatus } from "../../../interfaces/user.js";

export class CreateUserDto {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  status: TUserStatus;
}
