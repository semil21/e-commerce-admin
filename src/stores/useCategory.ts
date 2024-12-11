import { create } from "zustand";
import { categoryProps } from "../interfaces/category.interface";
import {
  addNewCategoryRecord,
  deleteCategoryRecord,
  fetchtAllCategories,
  updateCategoryRecord,
  updateCategoryRecordStatus,
} from "../services/api/categoryApi";

interface categoryStore {
  allCategories: categoryProps[];
  getAllCategories: () => Promise<void>;
  addNewCategory: (data: categoryProps) => Promise<void>;
  updateStatus: (id: string, status: boolean) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, data: categoryProps) => Promise<void>;
}

const useCategoryStore = create<categoryStore>((set) => ({
  allCategories: [],

  getAllCategories: async () => {
    try {
      const fetchCategories = await fetchtAllCategories();
      set({ allCategories: fetchCategories.data.response });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  addNewCategory: async (data: categoryProps) => {
    try {
      const addRecord = await addNewCategoryRecord(data);

      if (addRecord.status === 200) {
        set((state) => ({
          allCategories: [...state.allCategories, addRecord.data.response],
        }));
      }
    } catch (error) {
      console.log("Failed to add new category");
    }
  },

  updateStatus: async (id: string, status: boolean) => {
    const updateCategoryStatus = await updateCategoryRecordStatus(id, status);
    const newStatus = status === true ? false : true;

    if (updateCategoryStatus.status === 200) {
      set((state) => ({
        allCategories: state.allCategories.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      }));
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const deleteRecord = await deleteCategoryRecord(id);

      if (deleteRecord.status === 200) {
        set((state) => ({
          allCategories: state.allCategories.filter((item) => item._id != id),
        }));
      }
    } catch (error) {
      console.log;
    }
  },

  updateCategory: async (id: string, data: categoryProps) => {
    try {
      const updateRecord = await updateCategoryRecord(id, data);

      if (updateRecord.status === 200) {
        set((state) => ({
          allCategories: state.allCategories.map((item) =>
            item._id === id
              ? { ...item, name: updateRecord.data.response.name }
              : item,
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to Update category");
    }
  },
}));

export default useCategoryStore;
