import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { t } from "i18next";
import { categoryProps } from "../../interfaces/category.interface";
import { getAllCategories, postCategoryApi } from "../../services/api/category";

export const useCategoryMutation = (reset: () => void) => {
  return useMutation({
    mutationFn: (payload: categoryProps) => postCategoryApi(payload),
    onSuccess: () => {
      reset();
      toast.success(t("Category Added Successfully."));
    },
  });
};

export const useGetCategoryMutation = () => {
  return useMutation({
    mutationFn: () => getAllCategories(),
  });
};
