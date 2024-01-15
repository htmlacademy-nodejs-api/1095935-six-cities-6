export type TUserStatus = "regular" | "pro";

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  status: TUserStatus;
}
