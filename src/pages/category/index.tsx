import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { categoryProps } from "../../interfaces/category.interface";
import { useCategoryMutation } from "../../hooks/api/category";

const Category = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit, reset } = useForm<categoryProps>();

  const { mutate, isPending } = useCategoryMutation(reset);

  const onSubmit: SubmitHandler<categoryProps> = (data) => mutate(data);

  return (
    <div className="flex  justify-center mt-7">
      <Button onPress={onOpen} color="primary">
        Add Category
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Category
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Category Name"
                  variant="bordered"
                  {...register("name")}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="bordered" onPress={onClose}>
                  <span className="text-red-600 font-medium	">Cancel</span>
                </Button>
                <Button
                  color="success"
                  onPress={() => {
                    handleSubmit(onSubmit)().then(() => onClose());
                  }}
                  isLoading={isPending}
                >
                  <span className="text-white font-medium	">Add Category</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Category;
