import { productInterface } from "../../interfaces/product.interface";
import httpService from "../httpService";

export const addNewProductRecord = async (data: productInterface) => {
  return await httpService.post("http://localhost:3500/product/create", data);
};
