import { categoryProps } from "../../interfaces/category.interface";
import httpService from "../httpService";

export const fetchtAllCategories = async () => {
  return await httpService.get("http://localhost:3500/category");
};

export const addNewCategoryRecord = async (props: categoryProps) => {
  return await httpService.post("http://localhost:3500/category/create", props);
};

export const updateCategoryRecordStatus = async (
  id: string,
  status: boolean,
) => {
  return await httpService.put(
    `http://localhost:3500/category/update-status/${id}`,
    { status },
  );
};
export const deleteCategoryRecord = async (id: string) => {
  return await httpService.delete(
    `http://localhost:3500/category/delete/${id}`,
  );
};

export const updateCategoryRecord = async (id: string, data: categoryProps) => {
  return await httpService.put(
    `http://localhost:3500/category/edit/${id}`,
    data,
  );
};
