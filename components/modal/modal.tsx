"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

type customModalProps = {
  modalName?: string;
  modalOpenTitle?: string;
  modalBelogsTo?: string;
};

const CustomModal = (props: customModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { modalName, modalOpenTitle, modalBelogsTo } = props;

  const handleSubmit = () => {};

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        className="font-medium text-[17px] w-[150px] "
      >
        {modalName}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              {modalOpenTitle && (
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Add New Category
                </ModalHeader>
              )}
              {modalBelogsTo === "category" ? (
                <ModalBody>
                  <Input
                    autoFocus
                    label="Enter Category Name"
                    variant="bordered"
                  />
                </ModalBody>
              ) : null}

              <ModalFooter>
                <Button
                  className="bg-red-600 text-white	"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  className="text-white bg-green-600 font-semibold	"
                  onPress={() => handleSubmit() && onClose}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
