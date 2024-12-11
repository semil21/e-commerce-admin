import { create } from "zustand";
import { productInterface } from "../interfaces/product.interface";
import { addNewProductRecord } from "../services/api/product.api";

interface productProps {
  allProducts: productInterface[];
  addProduct: (data: productInterface) => Promise<void>;
}

const useProductStore = create<productProps>((set) => ({
  allProducts: [],

  addProduct: async (data: productInterface) => {
    try {
      const saveRecord = await addNewProductRecord(data);

      if (saveRecord.status === 200) {
        set({ allProducts: saveRecord.data.response });
      }
    } catch (error) {
      console.log("Failed to add new product");
    }
  },
}));

export default useProductStore;
