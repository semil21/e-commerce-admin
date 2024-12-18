import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";
import useProductStore from "../../../stores/useProduct";

type sizeType = {
  product?: string;
};

const ProductSize = (props: sizeType) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const productId = props?.product;
  const { productSizes, getAllProductSizes } = useProductStore();

  useEffect(() => {
    if (isOpen) {
      getAllProductSizes(productId);
    }
  }, [isOpen]);

  console.log("length ++", productSizes.length);
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Size
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                {isLoading ? (
                  <div className="flex justify-center items-center   ">
                    <CircularProgress aria-label="Loading..." size="lg" />
                  </div>
                ) : (
                  <div className="relative overflow-x-auto shadow-md sm:rounded-xl mt-6 rounded-lg ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 dark:text-white text-[15px]"
                          >
                            Size
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 dark:text-white text-[15px]"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 dark:text-white text-[15px]"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 dark:text-white text-[15px]"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productSizes && productSizes.length == 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              className=" px-6 py-4 text-center text-gray-500 dark:text-black bg-gray-200 font-bold text-[15px]"
                            >
                              No Size Found
                            </td>
                          </tr>
                        ) : (
                          productSizes.map((item, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0 ? "bg-gray-200" : "bg-slate-50"
                              } dark:bg-gray-${index % 2 === 0 ? "800" : "900"} border-b dark:text-gray-400`}
                            >
                              <th scope="row" className="px-4">
                                <input
                                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[15px] h-[30px] rounded-lg border-2	"
                                  defaultValue={item.name}
                                />
                              </th>
                              <th scope="row" className="px-4">
                                <input
                                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[15px] h-[30px] rounded-lg border-2	"
                                  defaultValue={item.price}
                                />
                              </th>
                              <th scope="row" className="px-4">
                                <input
                                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[15px] h-[30px] rounded-lg border-2	"
                                  defaultValue={item.quantity}
                                />
                              </th>
                              <td className="px-6 py-4">
                                <button
                                  type="button"
                                  className={`py-2 px-5inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 border-slate-950 text-[15px] w-[85px] text-center ${
                                    item.status
                                      ? "text-teal-500 border-gray-200"
                                      : "text-red-500 border-gray-200"
                                  }`}
                                >
                                  {item.status ? "Active" : "InActive"}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductSize;
