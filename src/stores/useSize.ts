import { create } from "zustand";
import { sizeInterface } from "../interfaces/size.interface";
import { saveNewSizeRecord } from "../services/api/size.api";

interface sizeProps {
  allSizesOfAProduct: sizeInterface[];
  addNewSize: (data: sizeInterface) => Promise<void>;
}

const useSizeStore = create<sizeProps>((set) => ({
  allSizesOfAProduct: [],

  addNewSize: async (data: sizeInterface) => {
    try {
      const addRecord = await saveNewSizeRecord(data);

      if (addRecord.status === 200) {
        set({ allSizesOfAProduct: addRecord.data.response });
      }
    } catch (error) {
      console.log("Failed to add new size");
    }
  },
}));

export default useSizeStore;
