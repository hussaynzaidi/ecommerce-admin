import prismadb from "@/lib/prismadb";
import React from "react";
import { CategoryForm } from "./components/category-form"

const CategoryPage = async ({ params }: { params: { categoryId: string, storeId: string } }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
        storeId: params.storeId
    }
  })
  return (
    <div className="flex-col">
      <div className="flex-1 pt-6 p-8 space-y-4">
        <CategoryForm billboards= {billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
