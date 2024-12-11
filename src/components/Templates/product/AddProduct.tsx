import { useForm } from "react-hook-form";
import useCategoryStore from "../../../stores/useCategory";
import { useEffect } from "react";
import { productInterface } from "../../../interfaces/product.interface";
import useProductStore from "../../../stores/useProduct";

const AddNewProductTab = () => {
  const { register, handleSubmit, reset } = useForm();

  const { allCategories, getAllCategories } = useCategoryStore();

  const { addProduct } = useProductStore();

  useEffect(() => {
    if (allCategories.length == 0) {
      getAllCategories();
    }
  }, []);

  const onSubmit = async (data: productInterface) =>
    await addProduct(data).then(() => reset());

  return (
    <>
      <form className="max-w-sm mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select an option
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("category")}
        >
          {allCategories &&
            allCategories
              .filter((item) => item.status === true)
              .map((value, index) => (
                <option value={value._id} key={index}>
                  {value.name}
                </option>
              ))}
        </select>

        <div className="mb-6 mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Name
          </label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Product Name"
            {...register("name")}
          />
        </div>

        <div className="mb-6 mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Description
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            {...register("description")}
          ></textarea>

          <div className="mb-6 mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product Material
            </label>
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Product material Name"
              {...register("material")}
            />
          </div>

          <div className="mb-6 mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Origin Country
            </label>
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Origin Country Name"
              {...register("origin")}
            />
          </div>
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

export default AddNewProductTab;
