import { loginProps } from "../../interfaces/loginForm.interface";
import httpService from "../httpService";

export const postLoginApi = (payload: loginProps) => {
  return httpService.post("http://localhost:3500/admin/login", payload);
};
