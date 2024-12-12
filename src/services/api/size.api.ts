import httpService from "../httpService";
import { sizeInterface } from "../../interfaces/size.interface";

export const saveNewSizeRecord = async (props: sizeInterface) => {
  return await httpService.post("http://localhost:3500/size/create", props);
};
