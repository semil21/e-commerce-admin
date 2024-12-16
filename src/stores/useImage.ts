import { create } from "zustand";
import { postNewImage } from "../services/api/image.api";
import { imageProps } from "../interfaces/image.interface";

interface imageStore {
  saveNewImage: (data: imageProps) => Promise<void>;
}

const useImageStore = create<imageStore>(() => ({
  saveNewImage: async (data: imageProps) => {
    try {
      const saveImage = await postNewImage(data);

      console.log("image saved 123", saveImage);
    } catch (error) {
      console.log("Failed to add new image");
    }
  },
}));

export default useImageStore;
