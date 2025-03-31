import { UserZod } from "../interfaces/user.interface";

export interface ILoginResponse {
  user: UserZod;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
