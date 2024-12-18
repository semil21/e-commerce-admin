import { create } from "zustand";
import {
  addNewProductRecord,
  getAllProductsRecords,
  getAllSizeOfProductRecord,
  updateProductRecord,
  updateProductStatusRecord,
} from "../services/api/product.api";
import { productProps } from "../interfaces/product.interface";
import { sizeInterface } from "../interfaces/size.interface";

interface productInterface {
  allProducts: productProps[];
  productSizes: sizeInterface[];
  addProduct: (data: productProps) => Promise<void>;
  getAllProducts: () => Promise<void>;
  updateProductStatus: (id: string, status: boolean) => Promise<void>;
  updateProduct: (productId: string, data: productProps) => Promise<void>;
  getAllProductSizes: (productId: string) => Promise<void>;
}

const useProductStore = create<productInterface>((set) => ({
  allProducts: [],
  productSizes: [],

  addProduct: async (data: productProps) => {
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

  updateProductStatus: async (id: string, status: boolean) => {
    try {
      const updateStatus = await updateProductStatusRecord(id, status);
      if (updateStatus.status === 200) {
        set((state) => ({
          allProducts: state.allProducts.map((item) =>
            item._id === id
              ? { ...item, status: status === true ? false : true }
              : item,
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to update product status");
    }
  },

  updateProduct: async (productId: string, data: productProps) => {
    try {
      const updateRecord = await updateProductRecord(productId, data);

      if (updateRecord.status === 200) {
        set((state) => ({
          allProducts: state.allProducts.map((item) =>
            item._id === productId
              ? { ...item, name: updateRecord.data.response.name }
              : item,
          ),
        }));
      }
    } catch (error) {
      console.log("Failed To Update Product");
    }
  },

  getAllProductSizes: async (productId: string) => {
    try {
      const getRecords = await getAllSizeOfProductRecord(productId);

      if (getRecords.status === 200) {
        set({
          productSizes: getRecords.data.response,
        });
      }
    } catch (error) {
      console.log("Failed to get all sizes of the product.");
    }
  },
}));

export default useProductStore;
