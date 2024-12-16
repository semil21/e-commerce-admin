import React, { useEffect, useState } from "react";
import useProductStore from "../../../stores/useProduct";
import useImageStore from "../../../stores/useImage";
import { imageProps } from "../../../interfaces/image.interface";
import { useForm } from "react-hook-form";

const ImageTab = () => {
  const { allProducts, getAllProducts } = useProductStore();
  const [image, setImage] = useState<string | null>("");

  const { saveNewImage } = useImageStore();

  useEffect(() => {
    if (allProducts.length === 0) {
      getAllProducts();
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: imageProps) => {
    if (image) {
      data.image = image;
      await saveNewImage(data).then(() => reset());
    } else {
      console.log("No image uploaded yet");
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto mt-7">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select Product
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("product")}
        >
          {allProducts &&
            allProducts.map((value, index) => (
              <option value={value._id} key={index}>
                {value.name}
              </option>
            ))}
        </select>

        <div className="mb-6 mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select an Image
          </label>
          <input
            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="default_size"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubmit(onSubmit)}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default ImageTab;
