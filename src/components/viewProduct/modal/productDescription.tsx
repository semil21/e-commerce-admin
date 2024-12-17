import { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { productProps } from "../../../interfaces/product.interface";
import { useForm } from "react-hook-form";
import useCategoryStore from "../../../stores/useCategory";
import useProductStore from "../../../stores/useProduct";

const ProductDescription = (props: productProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { allCategories, getAllCategories } = useCategoryStore();
  const { updateProduct } = useProductStore();

  const { name, description, material, origin, category } = props;

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getAllCategories();
  }, []);

  const productId = props._id;
  const onSubmit = async (data: productProps) => {
    if (productId) {
      await updateProduct(productId, data);
    }
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Description
      </Button>
      <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="max-w-sm p-2 mt-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("product")}
                    defaultValue={category}
                  >
                    {allCategories &&
                      allCategories.map((value, index) => (
                        <option value={value._id} key={index}>
                          {value.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="max-w-sm p-2">
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="category-name-input"
                    className="py-3 px-4 block w-[450px] border border-black rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    {...register("name")}
                    defaultValue={name}
                  />
                </div>

                <div className="max-w-sm p-2">
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Category Name
                  </label>
                  <textarea
                    id="category-name-input"
                    className="py-3 px-4 block w-[450px] border border-black rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    {...register("description")}
                    defaultValue={description}
                  />
                </div>

                <div className="max-w-sm p-2">
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="category-name-input"
                    className="py-3 px-4 block w-[450px] border border-black rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    {...register("name")}
                    defaultValue={material}
                  />
                </div>

                <div className="max-w-sm p-2">
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="category-name-input"
                    className="py-3 px-4 block w-[450px] border border-black rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    {...register("origin")}
                    defaultValue={origin}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="text-white bg-green-700"
                  onPress={onClose}
                  onClick={handleSubmit(onSubmit)}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductDescription;
