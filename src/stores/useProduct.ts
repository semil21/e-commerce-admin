import { create } from "zustand";
import { productInterface } from "../interfaces/product.interface";
import {
  addNewProductRecord,
  getAllProductsRecords,
} from "../services/api/product.api";

interface productProps {
  allProducts: productInterface[];
  addProduct: (data: productInterface) => Promise<void>;
  getAllProducts: () => Promise<void>;
}

const useProductStore = create<productProps>((set) => ({
  allProducts: [],

  addProduct: async (data: productInterface) => {
    try {
      const saveRecord = await addNewProductRecord(data);

      if (saveRecord.status === 200) {
        set((state) => ({
          allProducts: [...state.allProducts, saveRecord.data.response],
        }));
      }
    } catch (error) {
      console.log("Failed to add new product");
    }
  },

  getAllProducts: async () => {
    try {
      const getRecord = await getAllProductsRecords();

      if (getRecord.status === 200) {
        set({ allProducts: getRecord.data.response });
      }
    } catch (error) {
      console.log("Failed to fetch all products");
    }
  },
}));

export default useProductStore;
