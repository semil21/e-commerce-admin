import { productProps } from "../../interfaces/product.interface";
import httpService from "../httpService";

export const addNewProductRecord = async (data: productProps) => {
  return await httpService.post("http://localhost:3500/product/create", data);
};

export const getAllProductsRecords = async () => {
  return await httpService.get("http://localhost:3500/product");
};

export const updateProductStatusRecord = async (
  id: string,
  status: boolean,
) => {
  return await httpService.put(
    `http://localhost:3500/product/update-status/${id}`,
    { status },
  );
};

export const updateProductRecord = async (id: string, data: productProps) => {
  return httpService.put(`http://localhost:3500/product/edit/${id}`, data);
};

export const getAllSizeOfProductRecord = async (productId: string) => {
  return await httpService.get(
    `http://localhost:3500/size/product-size/${productId}`,
  );
};
