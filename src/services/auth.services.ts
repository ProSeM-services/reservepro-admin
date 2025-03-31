import { UserZod } from "@/interfaces/user.interface";
import { axiosInstance, BASE_URL } from "../config/axios.config";
import { ILoginResponse } from "../interfaces/auth.interface";
import axios from "axios";

export class AuthServices {
  static async login(data: unknown): Promise<ILoginResponse> {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);

    return response.data;
  }

  static async me(): Promise<UserZod> {
    const response = await axiosInstance.post(`${BASE_URL}/auth/me`);
    return response.data;
  }
}

 