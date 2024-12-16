import { imageProps } from "../../interfaces/image.interface";
import httpService from "../httpService";

export const postNewImage = async (data: imageProps) => {
  return await httpService.post("http://localhost:3500/image/add", data);
};
