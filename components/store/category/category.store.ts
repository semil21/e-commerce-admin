import axios from "axios";
import { env } from "process";
import { create } from "zustand";

interface CategoryStore {
  allCategories: any[];
  getAllCategoriesService: () => void;
  addNewCategoryService: (newCategory: any) => void;
  upateCategoryStatus: (id: string, status: boolean) => void;
  deleteCategory: (id: string) => void;
  updateCategoryStore: (newCategory: any, id: string) => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  allCategories: [],

  getAllCategoriesService: async () => {
    try {
      const fetchData = await axios.get("http://localhost:3500/category");
      if (fetchData.status === 200) {
        set({ allCategories: fetchData.data.response });
      }
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  },

  addNewCategoryService: async (data) => {
    try {
      const saveData = await axios.post(
        "http://localhost:3500/category/create",
        data,
      );

      if (saveData.status === 200) {
        set((state) => ({
          allCategories: [...state.allCategories, saveData.data.response],
        }));
      }
    } catch (error) {
      console.error("Failed to add new category", error);
    }
  },

  upateCategoryStatus: async (id: string, status: boolean) => {
    const newStatus = status === true ? false : true;
    try {
      const updateStatus = await axios.put(
        `http://localhost:3500/category/update-status/${id}`,
        { status },
      );

      if (updateStatus.status === 200) {
        set((state) => ({
          allCategories: state.allCategories.map((cat) =>
            cat._id === id ? { ...cat, status: newStatus } : cat,
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to update category status");
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const deleteRecord = await axios.delete(
        `http://localhost:3500/category/delete/${id}`,
      );

      if (deleteRecord.status === 200) {
        set((state) => ({
          allCategories: state.allCategories.filter(
            (category) => category._id !== id,
          ),
        }));
      }
      console.log("deleteRecord - ", deleteRecord);
    } catch (error) {
      console.log("Failed to delete category");
    }
  },

  updateCategoryStore: async (id: string, data: string) => {
    try {
      const updateRecord = await axios.put(
        `http://localhost:3500/category/edit/${id}`,
        data,
      );

      if (updateRecord.status === 200) {
        set((state) => ({
          allCategories: state.allCategories.map((cat) =>
            cat._id === id
              ? { ...cat, name: updateRecord.data.response.name }
              : cat,
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to update category store");
    }
  },
}));

export default useCategoryStore;
