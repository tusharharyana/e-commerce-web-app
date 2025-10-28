import React from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  }[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-20">
        No products available.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
