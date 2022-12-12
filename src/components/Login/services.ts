import { userLoginAPI } from "./apis";

export type UserLoginProps = {
  email: string;
  password: string;
};

export function userLoginService(data: UserLoginProps) {
  return userLoginAPI(data);
}
