import { useState } from "react";
import { useForm } from "react-hook-form";
import { categoryProps } from "../../../interfaces/category.interface";
import useCategoryStore from "../../../stores/useCategory";

export const AddCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const { addNewCategory } = useCategoryStore();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: categoryProps) =>
    await addNewCategory(data).then(() => {
      toggleModal(), reset();
    });

  return (
    <>
      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        onClick={toggleModal}
      >
        Add Category
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg shadow-lg dark:bg-neutral-800 w-[500px]">
            <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
              <h3
                id="modal-title"
                className="text-lg font-semibold text-gray-800 w-full  text-center dark:text-white"
              >
                Add New Category
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={toggleModal}
              >
                <span className="sr-only font-red-300">Close</span>✖
              </button>
            </div>

            <div className="p-4  ]">
              <div className="max-w-sm">
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Category Name
                </label>
                <input
                  type="text"
                  id="input-label-with-helper-text"
                  className="py-3 px-4 block w-[450px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter Category Name "
                  aria-describedby="hs-input-helper-text"
                  {...register("name")}
                />
              </div>
            </div>

            <div className="flex justify-end items-center p-4 border-t dark:border-neutral-700">
              <button
                type="button"
                className="py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-red-700 dark:text-white dark:hover:bg-red-800"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="button"
                className="ml-2 py-2 px-4 bg-green-600 text-white rounded-lg dark:hover:bg-green-800"
                onClick={handleSubmit(onSubmit)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
