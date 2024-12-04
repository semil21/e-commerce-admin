"use client";
import { useEffect, useState } from "react";
import useCategoryStore from "../store/category/category.store";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Tooltip,
} from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { DeleteIcon } from "../icons/table/delete-icon";
import Swal from "sweetalert2";
import { EditIcon } from "../icons/table/edit-icon";

const CategoryPage = () => {
  const [isEditTrue, setIsEditTrue] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState(null);
  const [categoryId, setCateogryId] = useState(null);
  console.log("editCategoryName -", editCategoryName);

  const {
    allCategories,
    getAllCategoriesService,
    addNewCategoryService,
    upateCategoryStatus,
    deleteCategory,
    updateCategoryStore,
  } = useCategoryStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (allCategories?.length === 0) {
      getAllCategoriesService();
    }
  }, [allCategories, getAllCategoriesService]);

  // const onSubmit = async (data: any) => {
  //   console.log("data123 -", data);
  //   if (isEditTrue == true) {
  //     await updateCategoryStore(categoryId, data);
  //   } else {
  //     await addNewCategoryService(data);
  //   }
  // };

  const onSubmit = async (data: any) => {
    console.log("Submitted data:", data);

    if (isEditTrue) {
      await updateCategoryStore(categoryId, data);
    } else {
      await addNewCategoryService(data);
    }

    reset();
    setIsEditTrue(false);
    setEditCategoryName(null);
  };

  const handleStatusUpdate = async (id: string, status: boolean) => {
    await upateCategoryStatus(id, status);
  };

  const handleCategoryDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure, To delete this category ?",
      text: "Once deleted, You won't be able to revert this!",
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
  return (
    <>
      <div className="flex items-center justify-center mt-5 mb-5">
        <Button
          onPress={onOpen}
          color="primary"
          className="font-medium text-[17px] w-[150px] "
        >
          Add Category
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  {!isEditTrue == true ? "Add New Category" : "Update Category"}
                </ModalHeader>

                <ModalBody>
                  <Input
                    autoFocus
                    label="Enter Category Name"
                    variant="bordered"
                    {...register("name")}
                    defaultValue={
                      isEditTrue == true ? editCategoryName ?? "" : ""
                    }
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    className="bg-red-600 text-white	"
                    variant="flat"
                    onPress={() => {
                      onClose(), setIsEditTrue(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    className="text-white bg-green-600 font-semibold	"
                    onPress={onClose}
                    onClick={() => {
                      handleSubmit(onSubmit)(), onClose;
                    }}
                  >
                    {!isEditTrue ? "Add" : "Update"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      {allCategories.length > 0 && (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn className="text-white font-semibold font-[15px]">
              CATEGORY
            </TableColumn>
            <TableColumn className="text-white font-semibold font-[15px]">
              STATUS
            </TableColumn>
            <TableColumn className="text-white font-semibold font-[15px]">
              EDIT
            </TableColumn>
            <TableColumn className="text-white font-semibold font-[15px]">
              DELETE
            </TableColumn>
          </TableHeader>
          <TableBody>
            {allCategories.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="font-[15px]">{category.name}</TableCell>
                <TableCell>
                  {category.status == true ? (
                    <Button
                      size="sm"
                      className="text-white bg-green-600 font-semibold font-[15px]	"
                      onClick={() =>
                        handleStatusUpdate(category._id, category.status)
                      }
                    >
                      <span className="text-white">Active</span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() =>
                        handleStatusUpdate(category._id, category.status)
                      }
                    >
                      <span className=" font-semibold font-[15px]">
                        Inactive
                      </span>
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip content={`Edit - ${category.name}`} color="primary">
                    <button
                      onClick={() => {
                        onOpen(),
                          setIsEditTrue(true),
                          setEditCategoryName(category.name);
                        setCateogryId(category._id);
                      }}
                    >
                      <EditIcon size={20} fill="#ffa500" />
                    </button>
                  </Tooltip>
                </TableCell>
                <TableCell className="font-[15px]">
                  <Tooltip
                    content={`Delete - ${category.name}`}
                    color="danger"
                    onClick={() => handleCategoryDelete(category._id)}
                  >
                    <button onClick={() => handleCategoryDelete(category._id)}>
                      <DeleteIcon size={20} fill="#FF0080" />
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CategoryPage;
