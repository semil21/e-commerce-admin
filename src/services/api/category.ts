import { categoryProps } from "../../interfaces/category.interface";
import httpService from "../httpService";

export const postCategoryApi = (
  payload: categoryProps,
): Promise<categoryProps> => {
  return httpService.post("http://localhost:3500/category/create", payload);
};

export const getAllCategories = (): Promise<categoryProps[]> => {
  return httpService.get("http://localhost:3500/category");
};
