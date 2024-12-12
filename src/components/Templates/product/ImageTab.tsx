import React, { useEffect } from "react";
import useProductStore from "../../../stores/useProduct";

const ImageTab = () => {
  const { allProducts, getAllProducts } = useProductStore();

  useEffect(() => {
    if (allProducts.length === 0) {
      getAllProducts();
    }
  }, []);
  return (
    <>
      <form className="max-w-sm mx-auto mt-7">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select Product
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          //   {...register("product")}
        >
          {allProducts &&
            allProducts.map((value, index) => (
              <option value={value._id} key={index}>
                {value.name}
              </option>
            ))}
        </select>

        <div className="mb-6 mt-5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="default_size"
          >
            Default size
          </label>
          <input
            class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="default_size"
            type="file"
          />
        </div>
      </form>
    </>
  );
};

export default ImageTab;
