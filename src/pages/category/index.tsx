import React from "react";
import CategoryTable from "../../components/Templates/category/CategoryTable";
import { AddCategoryModal } from "../../components/Templates/category/AddCategoryModal";

const Category = () => {
  return (
    <>
      <AddCategoryModal />
      <div className="mt-[35px] rounded-lg">
        <CategoryTable />
      </div>
    </>
  );
};

export default Category;
