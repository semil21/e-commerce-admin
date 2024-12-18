import { useEffect } from "react";
import useProductStore from "../../stores/useProduct";
import ProductDescription from "./modal/productDescription";
import ProductSize from "./modal/productSize";
import ProductImage from "./modal/productImage";

const ViewProductTable = () => {
  const { allProducts, getAllProducts, updateProductStatus } =
    useProductStore();

  useEffect(() => {
    if (allProducts.length === 0) {
      getAllProducts();
    }
  }, []);

  const handleStatusUpdate = async (id: string, status: boolean) => {
    await updateProductStatus(id, status);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-xl mt-6 rounded-lg ">
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
                Description
              </th>
              <th scope="col" className="px-6 py-3 dark:text-white text-[15px]">
                Size
              </th>
              <th scope="col" className="px-6 py-3 dark:text-white text-[15px]">
                Images
              </th>
            </tr>
          </thead>
          <tbody>
            {allProducts &&
              allProducts.map((item, index) => (
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
                      onClick={() => handleStatusUpdate(item._id, item.status)}
                    >
                      {item.status ? "Active" : "InActive"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      <ProductDescription {...item} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      <ProductSize product={item._id} />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      <ProductImage />
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

export default ViewProductTable;
