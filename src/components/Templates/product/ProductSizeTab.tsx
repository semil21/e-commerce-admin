import { useEffect } from "react";
import useProductStore from "../../../stores/useProduct";
import { useForm } from "react-hook-form";
import { productProps } from "../../../interfaces/product.interface";
import useSizeStore from "../../../stores/useSize";

const ProductSizeTab = () => {
  const { allProducts, getAllProducts } = useProductStore();

  useEffect(() => {
    if (allProducts.length === 0) {
      getAllProducts();
    }
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const { addNewSize } = useSizeStore();

  const onSubmit = async (data: productProps) =>
    await addNewSize(data).then(() => reset());

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
            Product Size Name
          </label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Product Size Name"
            {...register("name")}
          />
        </div>

        <div className="mb-6 mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Quantity
          </label>
          <input
            type="number"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Product Size Name"
            {...register("quantity")}
          />
        </div>

        <div className="mb-6 mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Price
          </label>
          <input
            type="number"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Product Price"
            {...register("price")}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductSizeTab;
