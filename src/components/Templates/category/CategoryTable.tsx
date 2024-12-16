import { useEffect, useState } from "react";
import useCategoryStore from "../../../stores/useCategory";
import EditIcon from "../../../assets/icons/fill/edit";
import DeleteIcon from "../../../assets/icons/fill/delete";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { categoryProps } from "../../../interfaces/category.interface";

const CategoryTable = () => {
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    allCategories,
    getAllCategories,
    updateStatus,
    deleteCategory,
    addNewCategory,
    updateCategory,
  } = useCategoryStore();

  useEffect(() => {
    if (allCategories.length === 0) {
      getAllCategories();
    }
  }, []);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
    setEditCategoryName("");
    setEditCategoryId(null);
    reset();
  };

  const { register, handleSubmit, reset, setValue } = useForm();

  console.log("editCategoryId", editCategoryId);

  const onSubmit = async (data: categoryProps) => {
    if (editCategoryId) {
      await updateCategory(editCategoryId, data).then(() => {
        toggleModal();
        reset();
      });
    } else {
      await addNewCategory(data).then(() => {
        toggleModal();
        reset();
      });
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCategory(id);
        Swal.fire({
          title: "Deleted!",
          text: "Category Has Been Deleted Successfully.",
          icon: "success",
        });
      }
    });
  };

  const handleStatus = async (_id: string, status: boolean) => {
    await updateStatus(_id, status);
  };

  const onClickEditIcon = (id: string, name: string) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
    toggleModal();
    setTimeout(() => setValue("name", name), 0);
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          onClick={() => {
            toggleModal();
          }}
        >
          Add Category
        </button>
      </div>

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
                className="text-lg font-semibold text-gray-800 w-full text-center dark:text-white"
              >
                {editCategoryId ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={toggleModal}
              >
                <span className="sr-only">Close</span>✖
              </button>
            </div>

            <div className="p-4 border-2">
              <div className="max-w-sm">
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Category Name
                </label>
                <input
                  type="text"
                  id="category-name-input"
                  className="py-3 px-4 block w-[450px] border border-black rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter Category Name"
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-xl ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 dark:text-white text-[15px]">
                Category name
              </th>
              <th scope="col" className="px-6 py-3 dark:text-white text-[15px]">
                Status
              </th>
              <th scope="col" className="px-6 py-3 dark:text-white text-[15px]">
                Edit
              </th>
              <th scope="col" className="px-6 py-3 dark:text-white text-[15px]">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-200" : "bg-slate-50"
                } dark:bg-gray-${index % 2 === 0 ? "800" : "900"} border-b dark:text-gray-400`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black-400 text-[15px]"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className={`py-2 px-5inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 border-slate-950 text-[15px] w-[85px] text-center ${
                      item.status
                        ? "text-teal-500 border-gray-200"
                        : "text-red-500 border-gray-200"
                    }`}
                    onClick={() =>
                      handleStatus(item?._id ?? "", item?.status ?? false)
                    }
                  >
                    {item.status ? "Active" : "InActive"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      onClickEditIcon(item?._id ?? "", item?.name ?? ""),
                        setEditCategoryId(item?._id ?? "");
                    }}
                  >
                    <EditIcon />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleDelete(item._id ?? "")}
                  >
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryTable;
